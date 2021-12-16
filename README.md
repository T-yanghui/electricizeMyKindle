- ## 1.效果
  ![IMG_20210418_140317.jpg](https://github.com/T-yanghui/electricizeMyKindle/blob/master/images/effect.jpg)
  ## 2.技术框架

  - HTML

  - CSS

  - JS

  ## 3.文件说明

  - 主要文件index.html+kindleweather.js

  - 字体引用 https://www.font.im/

  - 时间日期显示，均用JS实现；英文和翻译使用扇贝每日一句API(由后端代理，解决跨域问题)；

    ```nginx
    #nginx部分配置
    server{
    	listen 8080;
        root /var/www;
        index tour.html index.html;
        server_name _;
        location / {
        #禁止缓存，每次都从服务器请求，方便调试
            add_header Cache-Control no-store;
        }
        #转发api请求
        location /api/{
            proxy_pass http://rest.shanbay.com;
            add_header 'Access-Control-Allow-Origin' 'rest.shanbay.com'
        }   
    }
    
    
    ```

    


  - 天气预报使用和风天气

  - Github地址：https://github.com/T-yanghui/Java/tree/master/KindleWeather

  - 温湿度传感器使用DHT11(之前SHT20阵亡了)

    ```c
    //1.借鉴树莓派 DHT11 温湿度传感器读取 C 语言版（https://shumeipai.nxez.com/2020/05/19/raspberry-pi-read-data-from-dht11-sensor-by-c.html）这篇文章的方法；
    //2.修改c语言main函数部分，将输出以json格式输出至temp文件夹；
    int main(void)
    {
        printf("PIN:%d\n", pinNumber);
    
        if (-1 == wiringPiSetup()) {
            printf("Setup wiringPi failed!");
            return 1;
        }
    
        pinMode(pinNumber, OUTPUT); // set mode to output
        digitalWrite(pinNumber, 1); // output a high level
    
        printf("Starting...\n");
        //输出文件的指针
        FILE *pf;
        pf=fopen("./temp","w");
        while (1)
        {
            //Stream指向文件开始第一个字节，覆盖之前的温湿度记录
            fseek(pf,0L,0);
            pinMode(pinNumber, OUTPUT); // set mode to output
            digitalWrite(pinNumber, 1); // output a high level
            delay(15000);
            if (readSensorData())
            {
                if(pf!=NULL){
                    //printf("Sensor data read ok!\n");
                    fprintf(pf,"{\"humid\":%d.%d,", (databuf >> 24) & 0xff, (databuf >> 16) & 0xff);
                    fprintf(pf,"\"temp\":%d.%d}\n", (databuf >> 8) & 0xff, databuf & 0xff);
                    databuf = 0;
                }
            }
            else
            {
                printf("Sensor dosent ans!\n");
                databuf = 0;
            }
        }
        fclose(pf);
        return 0;
    }
    //3.在nginx配置的root文件夹下建立temp的软链接，直接读取温湿度
    ```

    

  ## 4.使用方法
  1) 让kindle保持常亮(主页搜索框输入 ～ds)；
  2) kindle浏览器输入url( https://www.qiuming.top/kindle/index.html)直接使用，或者自己配置HTTP服务器；
  3) end
