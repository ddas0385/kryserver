FROM meanjs/mean:latest
RUN sed -i '7s/localhost/ddas0385:Welcome#123@ds135800.mlab.com:35800/' config/env/development.js
RUN sed -i '7s/mean-dev/krymongo/' config/env/development.js
RUN git clone https://github.com/ddas0385/kryserver.git --branch 0.5 --single-branch
RUN rm -rf modules/articles modules/chat
RUN cp -rf kryserver/* modules/
RUN npm install --quiet firebase-admin mongoose mongoose-auto-increment
