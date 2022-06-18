# 요구사항 분석
DB 설계  
![image](./READMEImages/DB.png)

# 구현 과정
### 환경 구축
- Node.js(Express)
- DB: SQlite(RDBMS), sequelize(ORM Library)

### 개발
- DB 구조 설계
- Model, Controller, Router 분리
- 테스트 더미데이터 추가(/src/configs/testJson.js)
- 요구사항에 따른 API 설계

# 요구사항에 따른 API 설계
|INDEX|METHOD|URI|DESCRIPTION|
|--|----|---------------|-----------|
|1|POST|/job/register|채용공고를 등록합니다.|
|2|PUT|/job/update/{채용공고_id}|채용공고를 수정합니다.|
|3|DELETE|/job/delete/{채용공고_id}|채용공고를 삭제합니다.|
|4-1|GET|/job/findAll|채용공고 목록을 가져옵니다.|
|4-2|GET|/job?search={keyword}|채용공고를 검색합니다.|
|5|GET|/job/detail/{채용공고_id}|채용 상세 데이터를 가져옵니다.|
|6|POST|/user/apply|채용공고에 지원합니다.|

[요구사항 API 상세정보 바로가기(Postman)](https://documenter.getpostman.com/view/16915998/UzBmLn65#32606e6e-96cd-4d2c-8edf-8edb4b2ab397)

# 전체 API(요구사항 API 제외)
|INDEX|METHOD|URI|DESCRIPTION|
|--|----|---------------|-----------|
|1|GET|/applyHistory/findAll|지원내역 목록을 가져옵니다.|
|2|POST|/company/create|회사를 등록합니다.|
|3|DELETE|/company/delete/{회사_id}|회사를 삭제합니다.|
|4|GET|/company/findAll|회사 목록을 가져옵니다.|
|5|POST|/user/signUp|유저를 생성합니다.|
|6|GET|/user/findAll|유저 목록을 가져옵니다.|

[전체 API(요구사항 API 제외) 상세정보 바로가기(Postman)](https://documenter.getpostman.com/view/16915998/UzBmLnAT)
