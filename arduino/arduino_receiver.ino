Connect the photoresistor one leg to pin 0, and pin to +5V
Connect a resistor (around 10k is a good value, higher
values gives higher readings) from pin 0 to GND. (see appendix of arduino notebook page 37 for schematics).

----------------------------------------------------

           PhotoR     10K
 +5    o---/\/\/--.--/\/\/---o GND
                  |
 Pin 0 o-----------

----------------------------------------------------
*/

#include <Wire.h>
 //define a pin for Photo resistor
int ledPin1=7;  
int ledPin2=8; //define a pin for LED
int y;
int z;
void setup()
{
    Wire.begin(8);                // join i2c bus with address #8
  Wire.onReceive(receiveEvent); // register event
  Serial.begin(9600);           // start serial for output
  pinMode(ledPin1,OUTPUT);
  pinMode(ledPin2,OUTPUT);
}

void loop()
{                                           
   delay(100); //short delay for faster response to light.
}

void receiveEvent(int howMany) {
 
  int x = Wire.read();    // receive byte as an integer
  Serial.println(x);  
  if( x==1 || x==2)
  {
    y=x;
  }
  else if(x==5 || x==6){
    z=x;
  }
  if ( y==1){
    digitalWrite(ledPin1,HIGH);
  }
  else if(y==2)
  {
    if(x==3)
    {
      digitalWrite(ledPin1, HIGH);
    }
    else if( x==4)
    {
      digitalWrite(ledPin1, LOW);
    }                                                                                                                                       
  }
  if(z==5){
    digitalWrite(ledPin2, HIGH);
  }
  else if(z==6){
    digitalWrite(ledPin2, LOW);
  }
}
