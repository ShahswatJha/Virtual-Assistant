import http.server
import socketserver
from chatbot import chatbot_query

PORT = 8080
DIRECTORY = 'public'

class Request_handler(http.server.SimpleHTTPRequestHandler):

    def __init__(self,*args,**kwargs):
        super().__init__(*args,directory=DIRECTORY,**kwargs)
    
    def Post_Resquest(self):
        self.send_response(200)
        content_length = int(self.headers['Content-Length'])
        post_body = self.rfile.read(content_length)
        self.end_headers()
        print('user query',post_body)
        google_search_chatbot_reply = chatbot_query(post_body)
        print('user query', post_body)
        google_search_chatbot_reply = chatbot_query(post_body)
        self.wfile.write(str.encode(google_search_chatbot_reply))
with socketserver.TCPServer(('', PORT),Request_handler) as httpd:
    print('serving at port', PORT)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()