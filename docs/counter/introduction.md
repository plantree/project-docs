## Introduction

<p align="left">
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-green.svg"></a>
<a href="https://goreportcard.com/report/github.com/plantree/counter"><img src="https://goreportcard.com/badge/github.com/plantree/counter"></a>
<a href="https://github.com/plantree/counter/actions/workflows/ci.yml"><img src="https://github.com/plantree/counter/actions/workflows/ci.yml/badge.svg"></a>
<a href="https://codecov.io/github/plantree/counter" > <img src="https://codecov.io/github/plantree/counter/branch/main/graph/badge.svg?token=V7I5WL9G9K"/></a>
</p>

A counting service for PV and UV (based on Golang and Redis)

#### 1. Why do this

I write a personal website: https://plantree.me, to archive my blogs. In the beginning, I used the [visitor-badge](https://github.com/jwenjian/visitor-badge) service to show the number of visitors of each page. However, I found some drawbacks:

1. The service is **not robust enough**, which will limit the request when the QPS is too high.
2. This service is just designed for generating badge, and the data service behind is [countapi](https://countapi.xyz/). Unfortunately, it just provide **limited interfaces and services**, which could not satisfy my need.

**I need a service that contains these functions:**

1. Count service and badge generator service are deployed independently, and count service just provide data service. BTW, source code about badge generator service will be put in [visitor-badge](https://github.com/plantree/visitor-badge).
2. Count service could support PV(Page-Views) and UV(Unique-Visitors).
3. Count service could support reset/update manually, with secret to avoid malicious tampering.

#### 2. counter vs [countapi](https://countapi.xyz/) vs [visitor-badge](https://github.com/jwenjian/visitor-badgevisitor-badge)/[hit-counter](https://github.com/gjbae1212/hit-counter)

|                     | counter                     | countapi                   | visitor-badge/hit-counter                                    |
| ------------------- | --------------------------- | -------------------------- | ------------------------------------------------------------ |
| **Service**         | just count                  | just count                 | hybrid count and badge generator, but not easy to get the data |
| **Open Source**     | ✅                           | ❌                          | ✅                                                            |
| **Self Deployment** | easy                        | difficult                  | medium                                                       |
| **Features**        | read/write, **with secret** | read/write, without secret | read only                                                    |

#### 3. How to use

- API description: https://app.swaggerhub.com/apis/plantree/counter/1.0.0
- Home page: https://counter.plantree.me/

#### 4. Changelog

##### 0.0.9 (2022-12-26)

###### Feature

1. README, the documentation and first version implementation
2. support PV, includes: get/increment/reset/delete

#### Reference:

1. https://github.com/jwenjian/visitor-badge
2. https://countapi.xyz/
3. https://github.com/gjbae1212/hit-counter
4. https://github.com/golang-standards/project-layout/blob/master/README.md
5. https://www.qikqiak.com/post/use-github-actions-build-go-app/
6. https://www.liwenzhou.com/posts/Go/deploy/
7. https://abigeater.com/archives/194


