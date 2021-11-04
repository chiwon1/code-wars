# Codewars

등록되어 있는 알고리즘 문제를 풀 수 있는 어플리케이션입니다.

![Nov-04-2021 11-59-06](https://user-images.githubusercontent.com/77020787/140250695-5e944b3a-5a89-47ba-b839-f408c22ecb97.gif)

## Feature

1. GET /login

- 로그인 버튼
- 로그인에 성공하면 `/` 페이지로 redirect
- 로그인에 실패하면 `/login` 페이지로 redirect
- 로그인 하지 않은 사용자는 로그인 페이지 이외의 페이지는 방문할 수 없음

2. GET /

- 데이터베이스를 이용하여 페이지에 문제 정보를 출력
    - 문제 이름
    - 정답자 수
    - 문제 레벨
- 리스트의 문제 클릭 시, `/problems/:problem_id` 페이지로 이동

3. GET `/problems/:problem_id`

- `problem_id`에 해당하는 문제의 상세 정보출력
    - 문제 이름
    - 정답자 수
    - 문제 레벨,
    - 문제 설명
- 문제에 대한 솔루션 코드를 입력할 수 있는 폼
- 정답 제출 버튼
- 제출 버튼 클릭 시`POST /problems/:problem_id`로 솔루션 정보 전송

4. POST `/problems/:problem_id`

- 클라이언트로부터 제출받은 코드 정보를 데이터베이스의 정답 코드를 이용하여 정답이 모두 일치하는지 판별
- 제출된 코드가 테스트를 모두 통과했을 경우, 축하 메시지와 문제 리스트 화면으로 이동할 수 있는 링크 출력
- 제출된 코드가 테스트를 모두 통과하지 못했을 경우, 통과하지 못한 테스트 출력
- 제출된 코드로 인한 실행 오류가 발생했을 경우, 어떤 오류가 발생했는지 출력
- 서버 내부적인 코드 실행 오류가 발생했을 경우, 오류메시지 출력

5. Error & Invalid URL

- 유효하지 않은 URL로 들어왔을 경우, 404 Not Found 메시지 출력
- 서버 내부적인 문제가 발생했을 경우, 500 Internal Server Error 메시지 출력

### Heroku 배포

- [Deploy link](https://codewars-cw.herokuapp.com/)

## Setup

```
npm install

```

## Development

```
npm run dev

```
