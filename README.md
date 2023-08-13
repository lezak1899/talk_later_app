## Project Name ：talk_later

Author home page ：https://gitee.com/likunzhu



### 1、Brief Introduction

The instant messaging platform enables people far apart to conveniently communicate, enhancing their quality of life and work efficiency. After gaining a comprehensive understanding of user needs, the “talk later” platform was meticulously designed and divided into two components: the APP client end and the system management background. This architecture adopts a front-end and back-end separation approach.

The project encompasses three main components: the development of the APP client utilizing H5+ and MUI technologies, the system management background development based on VUE and ElementUI, and the system service support built on SpringBoot + WebSocket. The chat back system’s APP terminal not only facilitates the management of sessions, friend information, and personal details but also provides reliable and efficient communication services to its users. After undergoing rigorous testing, the system has successfully achieved its intended design objectives.



### 2、 Introduction to System Development Tools and Technologies 

####  2.1 The technology overview of this system is shown as below:

![输入图片说明](readme/%E5%9B%BE%E7%89%87.png)

#### 2.2 Backend Development Technologies:

- Spring Boot: Used for rapid development of web applications and is the foundation of the Spring framework [5]. This project is built on the Spring Boot development framework.
- WebSocket: A core technology for real-time communication, specifically designed for instant messaging. WebSocket simplifies the interaction between the server and client, allowing the server to push messages actively.
- Session: Used for login authentication and is a session management technology based on cookies [1].
- Swagger: A technology for specifying interfaces. By using annotations, Swagger can generate HTML pages and wiki-style interface documentation, making it convenient and efficient.
- Google ZXing: A technology provided by Google for generating QR code images.
- Alibaba Cloud Object Storage: Provides developers with a scalable, secure, cost-effective, and highly reliable cloud storage service. This project uses Alibaba Cloud Object Storage to store and access files.
- JPA + JdbcTemplate: Embracing the JPA standard, this project utilizes JPA for simple CRUD operations on single tables. For complex queries involving multiple table associations, JdbcTemplate is used. JdbcTemplate allows for highly customizable SQL statements and is the preferred choice for complex query scenarios.

#### 2.3  Frontend Development Technologies:

- Vue 2.x: Currently, the Vue framework is soaring in popularity in the frontend domain, offering numerous excellent features such as two-way data binding, component-based architecture, and reactive design. The frontend of this project’s administration system is implemented using the Vue framework.
- Element UI: A component library for the Vue framework, providing many ready-to-use components that are highly convenient.
- H5+: Designated as a standard by the China Industry Alliance, H5+ provides many APIs for accessing mobile hardware.
- MUI: A frontend framework based on H5+, offering a wide range of practical components.
- ECharts: A highly influential charting library in the industry. This project utilizes ECharts to visualize statistical data.

#### 3  System Architecture:

​	The chat system provides two user platforms: one is the user-side app, and the other is the web-based administration portal. Users need to install the Chat app on their mobile devices to use the user-side platform, while the administration portal can be accessed through a web browser on a computer. The overall system design is minimalistic, visually appealing, and user-friendly. 

![输入图片说明](readme/%E5%9B%BE%E7%89%872.png)
![输入图片说明](readme/%E5%9B%BE%E7%89%873.png)

 	The system architecture is as shown in the diagram. The Chat app on the client-side directly interacts with the web server over the network and facilitates data exchange with the database. On the web-based administration portal, the browser requests the frontend project of the management interface, which then sends the data to the backend. The backend processes the data and saves it to the database. 

#### 4  The Database Design of the System 

![输入图片说明](readme/%E5%9B%BE%E7%89%874.png)
![输入图片说明](readme/%E5%9B%BE%E7%89%875.png)
![输入图片说明](readme/%E5%9B%BE%E7%89%876.png)
#### 5 Some Screenshots of the System 
![输入图片说明](readme/%E5%9B%BE%E7%89%877.png)
![输入图片说明](readme/%E5%9B%BE%E7%89%878.png)
![输入图片说明](readme/%E5%9B%BE%E7%89%879.png)
![输入图片说明](readme/%E5%9B%BE%E7%89%8710.png)
![输入图片说明](readme/%E5%9B%BE%E7%89%8711.png)
![输入图片说明](readme/%E5%9B%BE%E7%89%8712.png)
![输入图片说明](readme/13%E5%9B%BE%E7%89%87.png)
![输入图片说明](readme/%E5%9B%BE%E7%89%8714.png)