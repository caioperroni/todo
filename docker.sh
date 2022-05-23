#!/bin/bash
cd api && npm run build -- docker
cd ../ui && npm run build -- docker
