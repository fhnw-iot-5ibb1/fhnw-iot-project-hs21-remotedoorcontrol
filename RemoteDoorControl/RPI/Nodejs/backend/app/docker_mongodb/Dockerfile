FROM cretzel/rpi-mongodb
WORKDIR /usr/src/mongdb
COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
VOLUME ./ /data/db
EXPOSE 27017
CMD ["mongod"]
