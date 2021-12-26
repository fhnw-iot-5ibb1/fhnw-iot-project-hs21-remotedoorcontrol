// Move to DoorClose

  // This function lets you control spinning direction of motors
  
  void dooropenA()
  {
    int V1 = digitalRead(S1);
    // Serial.println("V1 = " + (char)V1);

    if(V1 == 1){
      motorAisMoving = 0;
    }
    
    if (motorAisMoving == 1)
    {          
      analogWrite(in1, 0);
      analogWrite(in2, speed);      
    }else{      
      // Serial.println("Should stop V1");  
      analogWrite(in1, 0);
      analogWrite(in2, 0);
      isOpenA = 1;
     }
  }
  void dooropenB()
  {
    int V3 = digitalRead(S3);
    //Serial.println("V3 = ");
    //Serial.println(V3);

    if(V3 == 1){
      motorBisMoving = 0;
    }
    
    if (motorBisMoving == 1)
    {       
      analogWrite(in3, 0);
      analogWrite(in4, speed);      
    }else{          
      analogWrite(in3, 0);
      analogWrite(in4, 0);
      isOpenB = 1;
     }
  }
