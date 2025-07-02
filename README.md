# IoT-Based Automatic Aerator Control System for Ornamental Fish Aquariums

![System Architecture](https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/692873e69b240f8d05d3d60b9559ceed/ee9299a9-e494-446d-811d-0364ce13c92c/62cb21b9.png)

## 📋 Overview

This project presents an IoT-based automatic aerator control system for ornamental fish aquariums using an ESP8266 microcontroller. The system employs a waterflow sensor to detect real-time water circulation from the main pump and activates a backup aerator via relay when flow interruption occurs.

### 🎯 Key Features

- **Real-time monitoring** of water flow circulation
- **Automatic failover** to backup aerator (2.72s response time)
- **Remote control** via Blynk mobile application
- **WiFi connectivity** for instant notifications
- **Cost-effective** ESP8266-based solution
- **Reliable performance** with 100% system reliability

## 🏗️ System Architecture

![Benefits Overview](https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/692873e69b240f8d05d3d60b9559ceed/b16fc408-6908-4ab6-9035-fcc0ca7fc6c1/2066ca83.png)

The system consists of:
1. **ESP8266 Microcontroller** - Main processing unit
2. **Water Flow Sensor** - Detects pump operation status
3. **Relay Module** - Controls backup aerator activation
4. **Blynk App Integration** - Remote monitoring and control
5. **WiFi Network** - IoT connectivity

## 🔧 Hardware Components

- ESP8266 NodeMCU/Wemos D1 Mini
- Water Flow Sensor (YF-S201 or similar)
- 5V Relay Module
- Backup Aerator Pump
- Jumper wires and breadboard
- Power supply (5V/12V depending on aerator)

## 💻 Software Requirements

- Arduino IDE
- ESP8266 Board Package
- Required Libraries:
