# Mirror

Mirror is a peer to peer screen share project using webrtc to share screen mediastream and using websocket as signal server. It basiclly has two role, serve and observe. If you are intrest in webrtc's communication steps, go to [webrtc.org](https://webrtc.org/getting-started/firebase-rtc-codelab) to learn more.

## Serve

1. Chose which to share, save into a stream
2. Wait for req signal
3. Create new peerConnection with configuration
4. Create offer of the new peerConnection
5. Use offer to set local
6. Use new peerConnection to send offer
7. Wait for answer of the sent offer
8. User answer to set remote
9. Write stream into the peerConnection
10. Repeat step 2.

## Observe

1. Create new peerConnection
2. Send req to serve to req Offer
3. Use Offer to set remote
4. Create answer for the offer
5. Use answer to set local
6. Send answer to serve

## Signal

> Wait to complete...

1. Two Routes, /offer and /receiver
2. Once there is a ws connection, create it and save it into an array,
   so that we have two arrays: offers[] and receivers[]
