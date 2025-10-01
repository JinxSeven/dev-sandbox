# Kafka + .NET with Docker

This project demonstrates running **Kafka** (with UI) in Docker and connecting a **.NET console app**.

---

### 1. Create a Docker Network

```bash
docker network create kafka-net
```

---

### 2. Start Kafka

#### Option A: Build image locally (if repo is cloned)

```bash
docker build -t lenses-kafka .
docker run --rm -d --network kafka-net -p 2181:2181 -p 3030:3030 -p 9092:9092 -p 8081:8081 -p 8082:8082 -e ADV_HOST=lenses-kafka-cluster --name lenses-kafka-cluster lenses-kafka
```

#### Option B: Pull from Docker Hub

```bash
docker run --rm -d --network kafka-net -p 2181:2181 -p 3030:3030 -p 9092:9092 -p 8081:8081 -p 8082:8082 -e ADV_HOST=lenses-kafka-cluster --name lenses-kafka-cluster lensesio/fast-data-dev
```

---

### 3. Run Kafka UI

#### Option A: Build image locally (if repo is cloned)

```bash
docker build -t provectuslabs/kafka-ui .
docker run --rm -d --network kafka-net -p 7000:8080 -e DYNAMIC_CONFIG_ENABLED=true --name provectus-kafka-ui provectuslabs/kafka-ui
```

#### Option B: Pull from Docker Hub

```bash
docker run --rm -d --network kafka-net -p 7000:8080 -e DYNAMIC_CONFIG_ENABLED=true --name provectus-kafka-ui provectuslabs/kafka-ui
```


➡️ Access the UI at: [http://localhost:7000](http://localhost:7000)

---

### 4. Build & Run the .NET App

#### Build

```bash
docker build -t image-name .
```

#### Run

```bash
docker run --rm --network kafka-net --name container-name image-name
```

---

## Notes

* Use `kafka-cluster:9092` as `BootstrapServers` in your .NET app config.
* `ADV_HOST=kafka-cluster` ensures Kafka advertises itself correctly inside the Docker network.
* All containers must run on the same `kafka-net` network for connectivity.

---
