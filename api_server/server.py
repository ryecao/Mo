from flask import Flask
import flask
from calc import process_csv, get_results
from werkzeug.routing import BaseConverter

class IntListConverter(BaseConverter):
    regex = r'\d+(?:,\d+)*,?'

    def to_python(self, value):
        return [int(x) for x in value.split(',')]

    def to_url(self, value):
        return ','.join(str(x) for x in value)

app = Flask(__name__)
app.url_map.converters['int_list'] = IntListConverter
raw_data, data, distances, titles = process_csv()
already_calced = set()

@app.route("/")
def hello():
    return "api server"

@app.route('/movie/<int_list:ids>/<int:k>', methods=['GET'])
def get_k_closest(ids, k):
    res = get_results(ids, k, raw_data, data, distances, already_calced, titles)
    return flask.json.jsonify(res)

if __name__ == "__main__":
    app.run()