---
category: Notes

tags: 
  - TCP

title: 'TCP协议的三次握手和四次挥手'

description: 'TCP报文格式说明，TCP握手与挥手过程完整图释。'

date: 2018-02-21

vssue-title: 'TCP协议的三次握手和四次挥手'
---

<!-- more -->

## 一、OSI七层模型与TCP/IP协议简介

[![OSI七层模型与TCP/IP四层（参考）模型](http://owoccema2.bkt.clouddn.com/diagrams/tcp/TCPdeal.png)](http://owoccema2.bkt.clouddn.com/diagrams/tcp/TCPdeal.png)

[OSI模型](https://baike.baidu.com/item/OSI/5520#1)（Open System Interconnection Reference Model，缩写为OSI）,全名**“开放式系统互联通信参考模型”**，是一个试图使各种计算机在全世界范围内互联为网络的标准框架。
[TCP/IP协议族](https://baike.baidu.com/item/tcp%2Fip%E5%8D%8F%E8%AE%AE%E7%B0%87/1137204)（TCP/IP Protocol Suite，或TCP/IP Protocols），简称TCP/IP协议。有关TCP/IP协议的详细理论介绍参见《[TCP/IP详解](http://www.52im.net/topic-tcpipvol1.html)》。

## 二、TCP报文格式说明

- TCP协议属于OSI模型的传输层，传输层的功能是使源端主机和目标端主机上的对等实体可以进行会话。

- TCP协议是一个面向连接的、可靠的协议。它将一台主机发出的字节流无差错地发往互联网上的其他主机。

- 在发送端，它负责把上层传送下来的字节流分成报文段并传递给下层。

- 在接收端，它负责把收到的报文进行重组后递交给上层。

- TCP协议还要处理端到端的流量控制，以避免缓慢接收的接收方没有足够的缓冲区接收发送方发送的大量数据。
  [![TCP报文格式图](http://owoccema2.bkt.clouddn.com/diagrams/tcp/TCPformat.png)](http://owoccema2.bkt.clouddn.com/diagrams/tcp/TCPformat.png)

  **图中重点字段介绍：**

  （1）序号：Seq序号，占32位，用来标识从TCP源端向目的端发送的字节流，发起方发送数据时对此进行标记。

  （2）确认序号：Ack序号，占32位，只有ACK标志位为1时，确认序号字段才有效，Ack=Seq+1。

  （3）标志位：共6个，即URG、ACK、PSH、RST、SYN、FIN等，具体含义如下：

  > SYN(synchronous)建立联机，发起一个新连接。
  >
  > ACK(acknowledgement )确认序号有效。
  >
  > PSH(push)传送，接收方应该尽快将这个报文交给应用层。
  >
  > FIN(finish)结束，释放一个连接。
  >
  > RST(reset)重置连接。
  >
  > URG(urgent)紧急指针有效。
  >
  > **需要注意的是：**
  > （A）不要将确认序号Ack与标志位中的ACK搞混了。
  >
  > （B）确认方Ack=发起方Req+1，两端配对。

## 三、TCP完整连接过程与状态示意

[![TCP连接状态转移图](http://owoccema2.bkt.clouddn.com/diagrams/tcp/TCPlink.png)](http://owoccema2.bkt.clouddn.com/diagrams/tcp/TCPlink.png)

- **LISTEN：** 侦听来自客户端的TCP端口的连接请求
- **SYN-SENT：** 再发送连接请求后等待匹配的连接请求（如果有大量这样的状态包，检查是否中招了）
- **SYN-RCVD：** 再收到和发送一个连接请求后等待对方对连接请求的确认（如有大量此状态，估计被flood攻击了）
- **ESTABLISHED：** 代表一个打开的连接
- **FIN-WAIT-1：** 等待远程TCP连接中断请求，或先前的连接中断请求的确认
- **FIN-WAIT-2：** 从远程TCP等待连接中断请求
- **CLOSE-WAIT：** 等待从本地用户发来的连接中断请求
- **LAST-ACK：** 等待原来的发向远程TCP的连接中断请求的确认（不是什么好东西，此项出现，检查是否被攻击）
- **TIME-WAIT：** 等待足够的时间以确保远程TCP接收到连接中断请求的确认
- **CLOSED：** 没有任何连接状态，连接结束

## 四、TCP的3次握手过程

所谓三次握手（Three-Way Handshake）即建立TCP连接，就是指建立一个TCP连接时，需要客户端和服务端总共发送3个包以确认连接的建立。在socket编程中，这一过程服务器accept（被动等待），由客户端执行connect来触发（主动打开）。

[![三次握手示例过程](http://owoccema2.bkt.clouddn.com/diagrams/tcp/shakehands.png)](http://owoccema2.bkt.clouddn.com/diagrams/tcp/shakehands.png)

**为什么需要“三次握手”？**

> 目的是“为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误”。
>
> **例子：** client发出的第一个连接请求报文段并没有丢失，而是在某个网络结点长时间的滞留了，以致延误到连接释放以后的某个时间才到达server。本来这是一个早已失效的报文段。但server收到此失效的连接请求报文段后，就误认为是client再次发出的一个新的连接请求。于是就向client发出确认报文段，同意建立连接。假设不采用“三次握手”，那么只要server发出确认，新的连接就建立了。由于现在client并没有发出建立连接的请求，因此不会理睬server的确认，也不会向server发送数据。但server却以为新的运输连接已经建立，并一直等待client发来数据。这样，server的很多资源就白白浪费掉了。采用“三次握手”的办法可以防止上述现象发生。例如刚才那种情况，client不会向server的确认发出确认。server由于收不到确认，就知道client并没有要求建立连接。”。主要目的防止server端一直等待，浪费资源。

整个流程如下图所示：

**seq：(Sequence number顺序号码)** **ack：(Acknowledge number确认号码)**
[![三次握手流程图](http://owoccema2.bkt.clouddn.com/diagrams/tcp/shakehands2.png)](http://owoccema2.bkt.clouddn.com/diagrams/tcp/shakehands2.png)

**（1）第一次握手：**

- 发送端首先发送一个带SYN标志的数据包给接收端。
- Client将标志位SYN置为1，随机产生一个值seq=J，并将该数据包发送给Server，Client进入SYN_SENT状态，等待Server确认。

**（2）第二次握手：**

- 接收端收到后，回传一个带有SYN/ACK标志的数据包以示传达确认信息。
- Server收到数据包后由标志位SYN=1知道Client请求建立连接，Server将标志位SYN和ACK都置为1，ack=J+1，随机产生一个值seq=K，并将该数据包发送给Client以确认连接请求，Server进入SYN_RCVD状态。

**（3）第三次握手：**

- 发送端再回传一个带ACK标志的数据包
- Client收到确认后，检查ack是否为J+1，ACK是否为1，如果正确则将标志位ACK置为1，ack=K+1，并将该数据包发送给Server，Server检查ack是否为K+1，ACK是否为1，如果正确则连接建立成功，Client和Server进入ESTABLISHED状态，完成三次握手，随后Client与Server之间可以开始传输数据了。

------

实例:
`IP 192.168.1.116.3337 > 192.168.1.123.7788: S 3626544836:3626544836 IP 192.168.1.123.7788 > 192.168.1.116.3337: S 1739326486:1739326486 ack 3626544837 IP 192.168.1.116.3337 > 192.168.1.123.7788: ack 1739326487,ack 1`

第一次握手：192.168.1.116发送位码syn＝1,随机产生seq number=3626544836的数据包到192.168.1.123,192.168.1.123由SYN=1知道192.168.1.116要求建立联机;

第二次握手：192.168.1.123收到请求后要确认联机信息，向192.168.1.116发送ack number=3626544837,syn=1,ack=1,随机产生seq=1739326486的包;

第三次握手：192.168.1.116收到后检查ack number是否正确，即第一次发送的seq number+1,以及位码ack是否为1，若正确，192.168.1.116会再发送ack number=1739326487,ack=1，192.168.1.123收到后确认seq=seq+1,ack=1则连接建立成功。

**SYN攻击：** [SYN 攻击原理以及防范技术](http://netsecurity.51cto.com/art/200608/30428.htm)

> 在三次握手过程中，Server发送SYN-ACK之后，收到Client的ACK之前的TCP连接称为半连接（half-open connect），此时Server处于SYN_RCVD状态，当收到ACK后，Server转入ESTABLISHED状态。SYN攻击就是Client在短时间内伪造大量不存在的IP地址，并向Server不断地发送SYN包，Server回复确认包，并等待Client的确认，由于源地址是不存在的，因此，Server需要不断重发直至超时，这些伪造的SYN包将长时间占用未连接队列，导致正常的SYN请求因为队列满而被丢弃，从而引起网络堵塞甚至系统瘫痪。SYN攻击时一种典型的DDos攻击（ 没有根治方法， 除非不用TCP/IP链接），检测SYN攻击的方式非常简单，即当Server上有大量半连接状态且源IP地址是随机的，则可以断定遭到SYN攻击了，使用系统自带的netstat 工具来检测SYN攻击命令可以让之现行：`#netstat -nap | grep SYN_RECV`

## 五、TCP的4次挥手过程

所谓四次挥手（Four-Way Wavehand）即终止TCP连接，就是指断开一个TCP连接时，需要客户端和服务端总共发送4个包以确认连接的断开。在socket编程中，这一过程由客户端或服务端任一方执行close来触发。

**为什么要四次挥手？** 

> 由于TCP连接是全双工（通讯传输的一个术语：即允许数据在两个方向上可以同时（瞬时）进行信号的双向传输，指A→B的同时B→A。）的，因此，每个方向都必须要单独进行关闭，这一原则是当一方完成数据发送任务后，发送一个FIN来终止这一方向的连接，收到一个FIN只是意味着这一方向上没有数据流动了，即不会再收到数据了，但是在这个TCP连接上仍然能够发送数据，直到这一方向也发送了FIN。首先进行关闭的一方将执行主动关闭，而另一方则执行被动关闭。

整个流程如下图所示：

[![一方主动关闭的四次挥手流程图](http://owoccema2.bkt.clouddn.com/diagrams/tcp/waveoff.png)](http://owoccema2.bkt.clouddn.com/diagrams/tcp/waveoff.png)

**（1）第一次挥手：** Client：我已经不会再给你发数据了。

- Client（主动关闭方）发送一个FIN，用来关闭Client到Server（被动关闭方）的数据传送，Client进入FIN_WAIT_1状态。
- (当然，在FIN包之前发送出去的数据，如果没有收到对应的ack确认报文，主动关闭方依然会重发这些数据)，但是，此时主动关闭方还可 以接受数据。

**（2）第二次挥手：** Server：好，我知道了。

- Server收到FIN后，发送一个ACK给Client，确认序号为收到序号+1（与SYN相同，一个FIN占用一个序号），Server进入CLOSE_WAIT状态。

**（3）第三次挥手：** Server：我的数据也发送完了，我也不会再给你发数据了。

- Server发送一个FIN，用来关闭Server到Client的数据传送，Server进入LAST_ACK状态。

**（4）第四次挥手：** Client：OK，我也知道了，再见。

- Client收到FIN后，Client进入TIME_WAIT状态，接着发送一个ACK给Server，确认序号为收到序号+1，Server进入CLOSED状态，完成四次挥手。

上面是一方主动关闭，另一方被动关闭的情况，实际中还会出现同时发起主动关闭的情况，具体流程如下图：
[![双方同时主动关闭的四次挥手流程图](http://owoccema2.bkt.clouddn.com/diagrams/tcp/waveoff2.png)](http://owoccema2.bkt.clouddn.com/diagrams/tcp/waveoff2.png)
流程和状态在上图中已经很明了，在此可以参考前面的四次挥手解析步骤，不再赘述。

## 六、常见问题

**TCP与UDP的区别是什么？**



- TCP（Transmission Control Protocol，传输控制协议）是基于连接的协议，也就是说，在正式收发数据前，必须和对方建立可靠的连接。一个TCP连接（一对一）必须要经过三次“对话”才能建立起来。保证两端通信主机之间的通信可达；全双工通信；面向字节流；首部最低20个字节
- UDP（User Data Protocol，用户数据报协议）是与TCP相对应的协议。它是面向无连接的传输层协议。它不与对方建立连接，而是直接就把数据包发送过去！支持一对一、一对多、多对一、多对多的交互通信。 不保证可靠交付，也不使用拥塞控制；面向报文的，没有拥塞控制，适合多媒体通信的要求；首部开销小8字节。

**三次握手有什么缺点？**

慢，效率低，占用系统资源高，易被攻击 TCP在传递数据之前，要先建连接，这会消耗时间，而且在数据传递时，确认机制、重传机制、拥塞控制机制等都会消耗大量的时间，而且要在每台设备上维护所有的传输连接，事实上，每个连接都会占用系统的CPU、内存等硬件资源。 而且，因为TCP有确认机制、三次握手机制，这些也导致TCP容易被人利用，实现DOS、DDOS、CC等攻击。

**为什么建立连接是三次握手，而关闭连接却是四次挥手呢？**

这是因为服务端在LISTEN状态下，收到建立连接请求的SYN报文后，把ACK和SYN放在一个报文里发送给客户端。而关闭连接时，当收到对方的FIN报文时，仅仅表示对方不再发送数据了但是还能接收数据，己方也未必全部数据都发送给对方了，所以己方可以立即close，也可以发送一些数据给对方后，再发送FIN报文给对方来表示同意现在关闭连接，因此，己方ACK和FIN一般都会分开发送。