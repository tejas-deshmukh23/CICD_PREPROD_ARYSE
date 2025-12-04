import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
// import useWebSocket from '../hooks/useWebSocket';
import { useContext } from 'react';
import UIDContext from '../../context/UIDContext';
import { generateTransactionId } from '../KeyGenerationApis/KeyGeneration';


export default function useWebSocketONDC(onMessage, gotSortedProductFlag) {

    const { uid, setUId, isWebsocketConnectionEstablished, setIsWebsocketConnectionEstablished} = useContext(UIDContext);
    //here we will call the function to create the transactionId
    // const response = generateTransactionId();
    // setUId(response.data);

    // useEffect(()=>{
    //   if(gotSortedProductFlag===false){
    //     console.log("returning from websocket because got sorted product flag is false");
    //     return;
    //   }
    // },[gotSortedProductFlag])

        // ✅ Generate transaction ID on mount and set UID safely
        useEffect(() => {

          if (!gotSortedProductFlag) {
            console.log("❌ Skipping WebSocket because gotSortedProductFlag is false");
            return;
          }

          console.log("not skipping websocket as the value of gotSortedProductFlag is : ",gotSortedProductFlag);

            const fetchTransactionId = async () => {
                try {
                    const response = await generateTransactionId();
                    console.log("Transaction Id created successfully");
                    setUId(response.data); // ✅ safe now
                } catch (error) {
                    console.error("Error generating transaction ID:", error);
                }
            };
    
            if (!uid) {
                fetchTransactionId();
            }
        }, [uid, setUId, gotSortedProductFlag]);

    
  useEffect(() => {

    if (!gotSortedProductFlag) {
      console.log("❌ Skipping WebSocket because gotSortedProductFlag is false");
      return;
    }

    console.log("not skipping websocket as the value of gotSortedProductFlag is : ",gotSortedProductFlag);

    if(uid===null || uid === undefined){
        return;
    }

    console.log("UID is ready, setting up websocket: ",uid);

    const socket = new SockJS('https://uat.getrysa.com/ws'); // Change if backend runs elsewhere

    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Checking the uid value before connecting to websocket : ",uid);
        client.subscribe(`/topic/callbacks/${uid}`, (message) => {
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
  }, [onMessage, uid, gotSortedProductFlag]);
}

// import { useEffect, useRef } from 'react';
// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import { useContext } from 'react';
// import UIDContext from '../../context/UIDContext';

// export default function useWebSocketONDC(onMessage, shouldConnect = true) {
//     const { uid } = useContext(UIDContext);
//     const clientRef = useRef(null);
//     const isConnectedRef = useRef(false);

//     useEffect(() => {
//         // Don't connect if conditions aren't met
//         if (!shouldConnect || uid === null || uid === undefined || !onMessage) {
//             console.log("WebSocket connection skipped:", { shouldConnect, uid, hasCallback: !!onMessage });
//             return;
//         }

//         console.log("Setting up WebSocket connection for UID:", uid);

//         // Clean up existing connection if any
//         if (clientRef.current) {
//             console.log("Cleaning up existing connection");
//             clientRef.current.deactivate();
//         }

//         const socket = new SockJS('https://uat.credithaat.in/ws');

//         const client = new Client({
//             webSocketFactory: () => socket,
//             debug: (str) => {
//                 console.log('STOMP Debug:', str);
//             },
//             onConnect: (frame) => {
//                 console.log('✅ Connected to WebSocket');
//                 console.log("🎯 Subscribing to topic:", `/topic/callbacks/${uid}`);
//                 isConnectedRef.current = true;
                
//                 // Subscribe to the topic
//                 const subscription = client.subscribe(`/topic/callbacks/${uid}`, (message) => {
//                     console.log('📨 Received WebSocket message:', message);
//                     try {
//                         const data = JSON.parse(message.body);
//                         console.log('📦 Parsed callback data:', data);
//                         onMessage(data);
//                     } catch (error) {
//                         console.error('❌ Error parsing WebSocket message:', error);
//                     }
//                 });
                
//                 console.log('✅ Successfully subscribed to callbacks');
//             },
//             onStompError: (frame) => {
//                 console.error('❌ STOMP error:', frame);
//                 isConnectedRef.current = false;
//             },
//             onDisconnect: (frame) => {
//                 console.log('🔌 Disconnected from WebSocket');
//                 isConnectedRef.current = false;
//             },
//             onWebSocketError: (error) => {
//                 console.error('❌ WebSocket error:', error);
//             },
//             // Connection settings
//             reconnectDelay: 5000,
//             heartbeatIncoming: 4000,
//             heartbeatOutgoing: 4000,
//         });

//         clientRef.current = client;
        
//         console.log("🚀 Activating WebSocket client...");
//         client.activate();

//         return () => {
//             console.log('🧹 Cleaning up WebSocket connection');
//             if (clientRef.current) {
//                 clientRef.current.deactivate();
//             }
//             isConnectedRef.current = false;
//         };
//     }, [uid, onMessage, shouldConnect]);

//     return {
//         isConnected: isConnectedRef.current,
//         uid: uid
//     };
// }