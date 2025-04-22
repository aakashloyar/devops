*** Backend Communication ***

*** Types ***
# Synchronous-> wait for response
* HTTP(Rest, GraphQL)

* Asynchrounous-> do not wait for respose
* pub-sub, messaging queue, server-sent events

# Websocket
* persistant connection
* debatable if sync/async
* why async-> your are just sending message not waiting that it is sent or not
* why sync-> you are sending it directly to user not sending it in a queue

* server cannot contact browser
* browser can contact

*** Websocket Start ***
* eg-> whatsapp, programming website, trading platform

# Leetcode -> not using websocket it use Polling
* when you submit a problem
* you send it to a messaging queue
* on completion it push it to database
* until that leetcode after interval check the status in database
* there will be 2 messaging queue 1 for premium 1 for normal
* for premium there will be fast response means more resources are allocated to it
* if it use websocket then it updated directly

