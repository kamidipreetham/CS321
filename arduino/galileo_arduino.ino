
#include <Wire.h>

int lightPin1=0; //For 
int lightPin2=1;
int lightPin3=2;
int tempPin=3;
int value1;
int value2;
int value3;
int temp;

void setup() {
  Wire.begin(); // join i2c bus (address optional for master)
  Serial.begin(9600);
  
}

byte x=3;
byte y=4;
byte p=5;
byte q=6;
byte a=51;
byte b=101;
byte c=151;
byte d=201;
byte e=251;
byte f=11;
byte g=15;

void loop() {
  value1=analogRead(lightPin1);
 // Serial.println(value1);
  if(value1<300){
  Wire.beginTransmission(8); // transmit to device #8
  Wire.write(x);              // sends one byte
  Wire.endTransmission();    // stop transmitting
  }
    else{
  Wire.beginTransmission(8); // transmit to device #8
  Wire.write(y);              // sends one byte
  Wire.endTransmission();    // stop transmitting
  }
  delay(100);

 value2=analogRead(lightPin2);
   //Serial.println(analogRead(lightPin2));
  if(value2>100){
  Wire.beginTransmission(8); // transmit to device #8
  Wire.write(p);              // sends one byte
  Wire.endTransmission();    // stop transmitting
  }
    else{
  Wire.beginTransmission(8); // transmit to device #8
  Wire.write(q);              // sends one byte
  Wire.endTransmission();    // stop transmitting
  }

  delay(100);
  value3=analogRead(tempPin);
 // Serial.println(value3);
  temp=(5000*value3)/1024;
  Serial.println(temp);
  if(temp>275){
     Wire.beginTransmission(8); // transmit to device #8
  Wire.write(g);              // sends one byte
  Wire.endTransmission();    // stop transmitting
   }
else if(temp>273){
     Wire.beginTransmission(8); // transmit to device #8
  Wire.write(e);              // sends one byte
  Wire.endTransmission();    // stop transmitting
   }
else if(temp>271){
      Wire.beginTransmission(8); // transmit to device #8
  Wire.write(d);              // sends one byte
  Wire.endTransmission();    // stop transmitting
    }
      else if(temp>269){
      Wire.beginTransmission(8); // transmit to device #8
  Wire.write(c);              // sends one byte
  Wire.endTransmission();    // stop transmitting
    }
      else if(temp>267){
      Wire.beginTransmission(8); // transmit to device #8
  Wire.write(b);              // sends one byte
  Wire.endTransmission();    // stop transmitting
    }
      else if(temp>265){
      Wire.beginTransmission(8); // transmit to device #8
  Wire.write(a);              // sends one byte
  Wire.endTransmission();    // stop transmitting
    }
    else if(temp<265){
      Wire.beginTransmission(8); // transmit to device #8
  Wire.write(f);              // sends one byte
  Wire.endTransmission();    // stop transmitting
      }
  delay(100);
}
