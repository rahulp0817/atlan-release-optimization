import http from 'k6/http';
import { check } from 'k6';

export default function () {
  let res = http.get('http://backend-service.backend-namespace.svc.cluster.local:8080/health');
  check(res, { 'status was 200': (r) => r.status === 200 });
}
