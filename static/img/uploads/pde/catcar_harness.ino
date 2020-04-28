#include "Servo.h"

Servo servo;

void setup() {              
  Serial.begin(9600);
  servo.attach(10);
  servo.write(90);
  pinMode(13, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    byte incomingByte = Serial.read();
    servo.write(constrain(incomingByte, 0, 179));
    digitalWrite(13, LOW);
  } else {
    digitalWrite(13, HIGH);
  }
  
  delay(10);
}
