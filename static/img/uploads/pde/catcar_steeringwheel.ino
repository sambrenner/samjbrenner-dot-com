// Using the I2C device class (I2Cdev) by Jeff Rowberg <jeff@rowberg.net>
// https://github.com/jrowberg/i2cdevlib

#include "Wire.h"
#include "I2Cdev.h"
#include "MPU6050.h"

MPU6050 accelgyro;

const int movingAvgSize = 10;
int movingAvg[movingAvgSize];
int movingAvgCounter = 0;
int runningOffset = 0;

int readyTime = 8000;
boolean ready = false;

#define LED_PIN 13
#define RESET_PIN 8

void setup() {
    Wire.begin();
    Serial.begin(9600);
  
    initMovingAvg();
    accelgyro.initialize();

    pinMode(LED_PIN, OUTPUT);
    pinMode(RESET_PIN, INPUT);
}

void loop() {
    if(!ready) {
      checkForReady();
      digitalWrite(LED_PIN, LOW);
    } else {
      digitalWrite(LED_PIN, HIGH);
      
      if(digitalRead(RESET_PIN)) runningOffset = 0;

      int rz = accelgyro.getRotationZ();
      rz = round(rz/128);
      pushMovingAverage(rz);
      
      int ma = getMovingAverage();
      runningOffset += ma;
      runningOffset = constrain(runningOffset, -5000, 5000);
      
      byte servoVal = map(runningOffset, 5000, -5000, 0, 180);
      Serial.write(servoVal);
    }   
    delay(10);
}

void pushMovingAverage(int val) {
  movingAvg[movingAvgCounter] = val;
  movingAvgCounter++;
  if(movingAvgCounter >= movingAvgSize) movingAvgCounter = 0;
}

int getMovingAverage() {
  int total = 0;
  
  for(int i=0; i<movingAvgSize; i++) {
    total += movingAvg[i];
  }
  
  return round(total / movingAvgSize);
}

void initMovingAvg() {
  for(int i=0; i<movingAvgSize; i++) {
    movingAvg[i] = 0;
  }
}

void checkForReady() {
  if(millis() > readyTime) {
    ready = true;
    digitalWrite(LED_PIN, HIGH);
  }
}
    
