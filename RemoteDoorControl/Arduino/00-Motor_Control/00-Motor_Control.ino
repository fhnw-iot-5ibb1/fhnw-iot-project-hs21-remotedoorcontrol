//Playground Door Lock Controller

//Control over 2 DC Motors, connected with an L293D motor driver IC

//Multiple access options as separeted bellow

//Endstops for position state of Door Lock

//Creator Sebastian Fernandez in colaboration with Christian Wernli

//Motor Control https://lastminuteengineers.com/l293d-dc-motor-arduino-tutorial/



#include "Adafruit_Fingerprint.h"
#include "01-Pins.h"
#include "02-DoorOpen.h"
#include "03-DoorClose.h"

// pin #2 is IN from sensor (GREEN wire)
// pin #3 is OUT from arduino  (WHITE wire)
SoftwareSerial mySerial(2, 3);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);
char inputBuffer[10];   

void setup() {
  //Serial Baudrate
  Serial.begin (9600);
  
  // Set all the motor control pins to outputs
  //pinMode(enA, OUTPUT);
  //pinMode(enB, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);

  // Turn off motors - Initial state
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);

  // Button to open close manually
  pinMode(S0,INPUT);
  digitalWrite(S1, LOW);
  digitalWrite(S3, LOW);


// **************** ENDSTOPS **********************
  //Door Open Motor A
  pinMode(S1,INPUT);
  digitalWrite(S1, LOW);

  //Door Closed Motor A
  pinMode(S2,INPUT);
  digitalWrite(S2, LOW);

    //Door Open Motor B
  pinMode(S3,INPUT);
  digitalWrite(S3, LOW);

  //Door Closed Motor B
  pinMode(S4,INPUT);
  digitalWrite(S4, LOW);
 // **************** ENDSTOPS **********************

// **************** FINGERPRINT **********************

  // set the data rate for the sensor serial port
  finger.begin(57600);
  
  if (finger.verifyPassword()) {
    //Serial.println("Found fingerprint sensor!");
  } else {
    //Serial.println("Did not find fingerprint sensor :(");
    while (1) { delay(1); }
  }

  finger.getTemplateCount();
  //Serial.print("Sensor contains "); Serial.print(finger.templateCount); Serial.println(" templates");
  //Serial.println("Waiting for valid finger...");

  // **************** ENDFINGERPRINT **********************
  
}

void loop() {
    if (Serial.available() > 0) {
      String data = Serial.readStringUntil('\n');
      if(data == "doorAction"){
        motorAisMoving = 1;
        motorBisMoving = 1;
        String doorActionMessage = "";
        doorActionMessage = "{'success': true,'motorA': "+ String(isOpenA) + ", 'motorB': " + String(isOpenB) + "}";
        Serial.println(doorActionMessage);
      }
      if(data == "getState"){
          String doorStateMessage = "";
         doorStateMessage = "{'success': true,'motorA': "+ String(isOpenA) + ", 'motorB': " + String(isOpenB) + "}";
        Serial.println(doorStateMessage);
      }
    }

    if(motorAisMoving == 1){      
      changeStateDoorA();
    } 
    
    if(motorBisMoving == 1){   
      changeStateDoorB();
    }  

    uint8_t isValidFinger = validateFingerPrintAndChangeState();        
   
  delay(150);
}

void changeStateDoorA(){  
    if(isOpenA == 1){
      doorcloseA();      
    } else{
      dooropenA();
    }
}

void changeStateDoorB(){  
    if(isOpenB == 1){
      doorcloseB();      
    } else{
      dooropenB();
    }
}


// returns -1 if failed, otherwise returns ID #
int validateFingerPrintAndChangeState() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK)  return -1;
  
  // found a match!
  //Serial.print("Found ID #"); Serial.print(finger.fingerID); 
  //Serial.print(" with confidence of "); Serial.println(finger.confidence);  

    motorAisMoving = 1;
    motorBisMoving = 1;
    changeStateDoorA();
    changeStateDoorB();
  return finger.fingerID; 
}
