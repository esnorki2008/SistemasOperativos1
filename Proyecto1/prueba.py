import sys
from socket import *

serverHost = '192.168.1.10'
serverPort = 8080

message = ['Client Message1', 'Client Message2']

if len(sys.argv) > 1:
    serverHost = sys.argv[1]

#Create a socket
sSock = socket(AF_INET, SOCK_STREAM)

#Connect to server
chunks = []
bytes_recd = 0
MSGLEN=1024
sSock.connect((serverHost, serverPort))
while bytes_recd < MSGLEN:
            chunk = sSock.recv(min(MSGLEN - bytes_recd, 2048))
            if chunk == b'':
                raise RuntimeError("socket connection broken")
            chunks.append(chunk)
            bytes_recd = bytes_recd + len(chunk)

print(b''.join(chunks))

'''
#Send messages
for item in message:
    sSock.send(item)
    data = sSock.recv(1024)
    print ('Client received: ', 'data')

sSock.close()
'''