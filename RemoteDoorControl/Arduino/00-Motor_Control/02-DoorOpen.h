// Move to DoorClose

  // This function lets you control spinning direction of motors
  
  void dooropenA()
  {
    int V1 = digitalRead(S1);
    //Serial.println("V1 = " + (char)V1);

    if(V1 == 0){
      motorAisMoving = 0;
    }
    
    if (motorAisMoving == 1)
    {    
      analogWrite(enA, 255);
      
      digitalWrite(in1, HIGH);
      digitalWrite(in2, LOW);      
    }else{      
      //Serial.println("Should stop V1");
      analogWrite(enA, 0);
      
      digitalWrite(in1, LOW);
      digitalWrite(in2, LOW);
      isOpenA = 1;
     }
  }
  void dooropenB()
  {
    int V3 = digitalRead(S3);
    //Serial.println("V3 = " + (char)V3);

    if(V3 == 0){
      motorBisMoving = 0;
    }
    
    if (motorBisMoving == 1)
    {    
      analogWrite(enB, 255);
      
      digitalWrite(in3, HIGH);
      digitalWrite(in4, LOW);      
    }else{      
      //Serial.println("Should stop V3");
      analogWrite(enB, 0);
      
      digitalWrite(in3, LOW);
      digitalWrite(in4, LOW);
      isOpenB = 1;
     }
  }
