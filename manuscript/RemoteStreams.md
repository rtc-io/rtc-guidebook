# Exchanging Media Streams

Now that we have an understanding of how to create a peer connection between peers, it's time to start building a more complete example.  This will combine what we have learned through the last two chapters.

I> From this point forward, you will either need to work through the examples with a friend, or potentially, run two separate browser sessions to check capture and connectivity.

## Minamalist Conferencing Using `rtc-quickconnect`

The following example demonstrates combining local media capture, peer connection and remote rendering.  From a UI perspective it's not terribly pretty, but it should show you what is required to start talking to your friends using WebRTC.

<<(code/remote-streams/conferencing.js)

This example contains a few new tricks that we haven't seen before:

- Firstly, we are using `rtc-media` to interface with a remote media stream with the following code:

  ```
  media(stream).render(document.body);
  ```

  This demonstrates how the exported function of the `rtc-media` module can be used with an existing stream, rather than attempting to capture a local stream (as it would if no arguments were supplied).

- Secondly, we are introduced to the `call:ended` event of `rtc-quickconnect`. This event is triggered once the browser (with a little help from quickconnect) has determined the a remote peer has disconnected. This is a good point at which to clean up any UI elements associated with a remote peer.

I> If you wish to respond more immediately to a peer disconnecting, you can tap into the `peer:leave` event that is provided by both `rtc-quickconnect` and `rtc-signaller` instances. It should be noted, however, that this event is triggered in response to the signaller losing communication with the signaling server.  This is usually a good indication that peers are also unable to communicate with each other, but there are instances where peers will remain active but signaling is no longer available.

## Multistream Capture and Communication

Most WebRTC demos you will see capture and share only a single media stream over a peer connection, however, it is completely possible (in Google Chrome at least) to capture and exchange multiple streams via an `RTCPeerConnection`.  If you are using quickconnect, then to add additional local streams to a connection, simply call the `addStream` function for each stream that you wish to add.

In the case that multiple streams have been added to a connection, when a call is started the `getRemoteStreams()` function will return each of the streams that are associated with the connection.  If you take another look at our previous example, you will note that the `call:started` handler actually deals with this case by iterating over each of the returned streams and rendering each of them.
