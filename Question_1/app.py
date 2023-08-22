from flask import Flask, request, jsonify
import requests
import json
import asyncio

app = Flask(__name__)

async def fetch_numbers_from_url(url):
    try:
        response = await asyncio.wait_for(requests.get(url), timeout=5)
        data = response.json()
        return data.get("numbers", [])
    except (requests.exceptions.RequestException, json.JSONDecodeError, asyncio.TimeoutError):
        return []

@app.route('/numbers', methods=['GET'])
def get_numbers():
    urls = request.args.getlist('url')
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    tasks = [fetch_numbers_from_url(url) for url in urls]
    numbers_lists = loop.run_until_complete(asyncio.gather(*tasks))
    loop.close()

    merged_numbers = sorted(set([num for numbers in numbers_lists for num in numbers]))
    response = {"numbers": merged_numbers}
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8008)
