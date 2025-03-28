# Atlan Release Optimization

This project is designed to optimize the release process using Helm, Helmfile, and GitHub Actions for CI/CD automation with advanced rollback capabilities.

## Completed Enhancements
### 📌 Optimized Helm Chart Deployment
✅ Reduced Helm Chart Sync Time – Refactored the Helm chart to be modular, improving deployment speed.
✅ Parallelized Helm Processes – Introduced parallel execution to prevent blocking engineers.
✅ Helm Values Customization – Used environment-based Helm values to reduce redundancy.

### 📌 Automated CI/CD Pipeline with Advanced Rollback
✅ GitHub Actions for CI/CD – Set up an end-to-end pipeline for backend, frontend, and database.
✅ Docker Build & Push – Uses docker/build-push-action to push images to GHCR.
✅ Helm-Based Kubernetes Deployment – Deploys to the cluster via helm upgrade --install.
✅ Health Checks & Readiness Probes – Ensures successful deployments before proceeding.
✅ Auto Rollback on Failure – Implements kubectl rollout undo in case of failed deployments.

### 📌 Eliminated Manual Testing Effort
✅ Automated Integration Tests – Replaced flaky manual testing with GitHub Actions for integration testing.
✅ k6 Load & Stress Testing – Integrated k6 for performance testing.
✅ Unit & End-to-End Tests – Ensured code reliability using Jest (backend) and Cypress (frontend).

### 📌 Improved Release Confidence & Frequency
✅ Versioned Deployments – Uses SHA-based image tagging (ghcr.io/myrepo/backend:${{ github.sha }}).
✅ Incremental Rollout Strategy – Deploys small changes safely without blocking engineers.
✅ Blue-Green Deployment Strategy – Allows switching traffic seamlessly between versions.

### 📌 Added Monitoring and Health Checks
✅ Added monitoring and health checks which in the deployments automatically triggered.

## Getting Started

### Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/your-repo/atlan-release-optimization.git
cd atlan-release-optimization
```
### Apply the secrets and run it
```bash
helmfile sync
```
### For parallel sync (100k+ lines)
```bash
helmfile sync --concurrency 20
```
## Results

### frontend and backend as been deployed 
![frontend and backend status](assets/Terminal%20helmfile1.png)

### Check the status
![frontend and backend status](assets/Terminal%20helmfile2.png)

### Check the namespaces 
![frontend and backend namespaces](assets/Terminal%20helmfile3.png)
![frontend and backend namespaces](assets/Terminal%20helmfile4.png)

### Get the data in the Kubectl
![frontend and backend status](assets/Terminal%20helmfile%20kubectl.png)

## Autoscaling
### Create the autoscaling for backend
```bash 
kubectl apply -f charts/backend/templates/hpa.yaml
```
![create autoscaling](assets/autoscale%20Terminal%201.png)

### Get the Status
```bash 
kubectl get hpa
```
![autoscaling status](assets/autoscaling%20terminal%202.png)

## Testing of Autoscaling
use `hey` an HTTP testing tool
```bash
hey -n 10000 -c 100 http://backend-service.backend-namespace.svc.cluster.local:8080/health
```
or 

use `k6` for testing
In `charts/backend/test/test.js` run the test file
```bash
cd charts/backend/test
k6 run test.js
```
