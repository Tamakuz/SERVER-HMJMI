import admin from "firebase-admin";

const firebaseConnect = () => {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: "service_account",
      project_id: "server-hmjmi",
      private_key_id: "960315969b22bb7fce46ba810298ea151380eef7",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpPIZvDDARBAIS\nktABomPJekOvimimT7U65R/O6YaNV53YGHvT0o8xG3bsN+K/37aqa9Rty7Y18D5u\n4t3fABftHom2DZyBXijFIAvMIDPBBcEH9/oYAkdyiTmBfzU+bQvGJVty8kSx/2+o\njBLG/pa1dnJGov8BuRe3wc00xvcEZsEJOsrnG4IGEnXILiElmyu7Sct6YdIa+LHu\nTw5ASXWJlnvZ7V+X92NwiWF6QFMVEneWvdpCJqqOopAezVswhwIB/h+5OoKlVgEc\n2Ltq1ER+596oplvT0elh/tRW2CJZQ5AlrV4Hxs3f3Iwj4pBg7DUsjOxQSx0hqOWc\nz40JH+9vAgMBAAECggEAPkC85OFzVvcF+iYWLNu64DTA7DQ6PZ9Jd6Ir+rVtYNXP\ngtuyxR8JvFMxgkAmgVU+QN9Mc50BaEL4/FooqmzC4F8g4h6MqQvlbGnW3R4lW4YN\n1SwTS7ye4pN221tbTxzWvWslghl7Soy/Wp04FQo2jwbEj5ZKvqwC/P3lydm8qNm4\nSM5MCK8ekWSwADLLOesof/A7TtOLET+rcQAVEuAz9ixiBu66mrAi8NOuQJ5fEvwO\nM8nqyJ7f0kuwuvSQGGa1gdOZAr72l7g8rzIH7Ld2Kk/HTLs8IOICAsBeWp5oKdyx\n/9bv56fIIf2HOA9K8RR94SwU6g8fENo+SVi/9UjlLQKBgQDWp24SBwjIHATYddsu\nb5l/UPl7D/5YQiagIAzro5kgsBLKxooBEKnnDY+KL+qypUs6qzP1uhK9xAz7hFPG\nakjNHQ0Fk2IjiHMzpKGrLwxO7NW3WeETneSatA26fn7+SJ4wuneGVcuqAHblcln7\nki2BbH29/gUBULNI1kLJasFvMwKBgQDJ1Y7C69D1nrqre72eJhemjXHPORSSZS0R\nY8ZpSFqwq0Zy/5jEWyFFmmKXntA89VrFwRD3h1qjX9dJMLizV4Ou3WwgTEaobjQa\nfZt4lxHEwcnXclbFQ+fUOlPePCNxQJ6JFnh21mGd4L/SLt7jVPc9GeyCN1J74H3s\nS7fj7//u1QKBgQCPMKVmdTbQdpBs7UHHGj8lBRlHlIWwzoABtR+pWTre6VW/2u1Y\nhIsyTIOCRTCk90rV2jsRIo059bxLVBymcWQbH9P98jE3TuC6hIosLXhide6jHtvc\nQCmtYYr+6z8/1aVhECKHhFgWEbU+nieUgBDHE15WDUu9ct4GKpfm0MY0rQKBgAOF\n7tAIPcWL18ZWiqDQGWmW3n23iVxk17yN+VCtKqga1Uf8njYPQS1t3Hq5Evl9bvA0\nxo8LldF0QtXMO+0lge7zfoexzSnzgoVT2/rm6DB/EX7pSAp5fPp/aide9V9suVe7\nRK8OXvXajn6kws9FFGvEoBRF0vLGoGwXhkY8UkNhAoGAHMS3dLoIka3M/OOWsp5Q\nYNq9MDj1iC7324t9VwXi30jwddSzbvueXkjkffd6lPq/NvTvu+EpkKdB/Sy6Cptg\ncTIs5WdfSwGAvd4sV5D3DZLayzU6lurXD0E6E1kU7UQNmcmJNUH2fQrJUZoEpez2\nGdmjV67t1rbC5f/o/PqIego=\n-----END PRIVATE KEY-----\n",
      client_email:
        "firebase-adminsdk-gpzz4@server-hmjmi.iam.gserviceaccount.com",
      client_id: "115912968814764286921",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gpzz4%40server-hmjmi.iam.gserviceaccount.com",
    }),
    storageBucket: "gs://server-hmjmi.appspot.com",
  });
};

export default firebaseConnect;
