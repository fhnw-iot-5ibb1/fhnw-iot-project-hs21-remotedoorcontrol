#!/bin/bash
service mongod start
exec "$@"
