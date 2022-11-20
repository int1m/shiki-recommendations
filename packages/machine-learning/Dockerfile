FROM python:3.9.14-buster as build

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

CMD ["python", "src/app.py", "--reload"]
