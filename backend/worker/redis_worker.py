import redis
import os
from dotenv import load_dotenv

load_dotenv('.env.prod')

redis_client = redis.Redis(
    host            =os.getenv('REDIS_HOST'), 
    port            =6379,
    db              =0,
    decode_responses=True
)

