import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
// import useWebSocket from '../hooks/useWebSocket';
import { useContext } from 'react';
import UIDContext from '../../context/UIDContext';
import { generateTransactionId } from '../KeyGenerationApis/KeyGeneration';


export default function useWebSocketONDCSelect(onMessage) {

    const { uid, setUId, isWebsocketConnectionEstablished, setIsWebsocketConnectionEstablished} = useContext(UIDContext);

    
  useEffect(() => {

    if(uid===null || uid === undefined){
        return;
    }

    console.log("UID is ready, setting up websocket: ",uid);

    const socket = new SockJS('https://uat.getrysa.com/ws'); // Change if backend runs elsewhere

    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Checking the uid value before connecting to websocket : ",uid);
        client.subscribe(`/topic/callbacks/select/${uid}`, (message) => {
          const data = JSON.parse(message.body);
          onMessage(data);
        });

        setTimeout(() => {
            setIsWebsocketConnectionEstablished(true);
        }, 1000);

        setIsWebsocketConnectionEstablished(true);
      },
      onStompError: (frame) => {
        console.error('STOMP error', frame);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [onMessage, uid]);
}