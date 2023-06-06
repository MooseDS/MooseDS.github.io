---
layout: post
title: "안드로이드 아키텍처 개발 PART 1. DI"
author: "대니"
tags: Architecture
excerpt_separator: <!--more-->
---

DI를 활용하여 Android 생명 주기에 따른 적절한 객체 참조를 위한. 객체 의존성 분리 / 주기 클래스별 그래프를 그려낼 수 있다<!--more-->
<br/><br/><br/>

# 작성 목표

1. 위 가이드를 읽는 과정에서 용어 위주로 정리 해보기 
    * 최대한 영어로 기억해보자
    <p/>
2. 퀴즈 만들기
    <p/>
3. 위 가이드를 읽고 난 후 해볼 수 있는 실습 생각해보기 
    * 그래프 피그마를 활용하여 만들기 

<br/>

# 학습 추천 가이드
Android 전용 DI인 Hilt를 이해하는데 수동 종속삽입, Dagger 적용, Hilt 적용 순으로 읽어보시면 이해가 잘 되었습니다.

### 참조 사이트
- [Android Develop Training - 수동 종속 삽입](https://developer.android.com/training/dependency-injection/manual?hl=ko) 
- [Android Develop Training - Dagger 적용](https://developer.android.com/training/dependency-injection/dagger-android?hl=ko)
- [Android Develop Training - Hilt 적용](https://developer.android.com/training/dependency-injection/hilt-android?hl=ko)


### 참조 예제 (Android Codelabs)
- [Dagger](https://developer.android.com/codelabs/android-dagger-to-hilt?hl=ko#0)
- [Hilt](https://developer.android.com/codelabs/android-dagger-to-hilt?hl=ko#0)

### 정리노트
- [주석 요약본](https://developer.android.com/training/dependency-injection/hilt-cheatsheet?hl=ko)

<br/>

# DI (dependency injection)

|용어            |설명|
|:--------------|:----------|
|종속항목 수동삽입&nbsp;&nbsp;|생성자 매개변수, Setter 를 활용하여 주입|
|종속항목 자동삽입&nbsp;&nbsp;|컴파일 타임에 수행하는 Dagger, Hilt(Android)|

<br/>

# **Dagger** 

## 용어 정리

### Android framework classes 에 종속항목 추가하기

|Classes|적용|
|:---|:----------|
|Application|appComponent lives to share its lifecycle|
|Activity, Fragment|Field injection should only be used in Android framework classes where constructor injection cannot be used.|

<br/>

### Injecting Activities

|절차|설명|
|:---|:----------|
|Expose a Inject Function&nbsp;&nbsp;|Function that takes as a _parameter_ in __@Component__ Interface|
|Dagger Graph 연결|Use the appComponent defined in your Application and call the Inject|
||Activity before calling **super.onCreate**|
||Fragment before calling **super.onAttach**|
|종속항목|필드 삽입|

<br/>

### Dagger Module

:  Modules are a way to semantically encapsulate information on how to provide objects 

> Note: You can use the @Provides annotation in Dagger modules to tell Dagger how to provide classes that your project doesn't own (e.g. an instance of Retrofit).

|모듈절차|설명|
|:--|:--|
|클래스 인스턴스 제공방법&nbsp;&nbsp;|expose @Provides function, return Class Instance|
|클래스 종속 항목|@Provides function Parameters|
|Dagger Graph 연결방법|Add Module to the @Component interface|

<br/>

### Dagger Scopes (범위지정)
 
: Scoping a type to the component’s lifecycle

|주의사항|
|:--|
| - Memory leaks|
| - Modules that use a scope annotation can only by used in components that are annotated with the same scope.|

<br/>

### 하위 구성요소

|절차|설명|
|:--|:--|
|구성요소 생성|@Subcomponent 주석 지정|
||@Subcomponent.Factory Interface 구현 (인스턴스 생성 방법)|
|Dagger Graph 연결(알리기)&nbsp;&nbsp;|@Module Class 생성|
||상위 구성요소에 Module 추가|
||상위 구성요소에서 하위 구성요소 인스턴스 생성하는 팩토리 함수 추가|
|종속삽입|Application Framework Classes 에 특수 삽입|

<br/>

### 하위 구성요소 범위 할당

: 하위요소는 구성요소 요청될 때마다 항상 동일한 인스턴스를 제공하기 위해 하위요소, 구성요소 모두 주석을 지정해야함 

|범위 할당 규칙|
|:--|
|- 유형이 범위 주석으로 표시되면 동일한 범위로 주석이 지정된 구성요소에서만 이 유형을 사용할 수 있습니다.|
|- 구성요소가 범위 주석으로 표시되면 구성요소는 이 주석이 있는 유형 또는 주석이 없는 유형만 제공할 수 있습니다.|
|- 하위 구성요소는 상위 구성요소 중 하나에서 사용하는 범위 주석을 사용할 수 없습니다.| 

## 퀴즈

```
Q. 다음 Dagger 관련된 설명 중 틀린 설명을 고르시오.

1. Dagger 리플렉션 기반의 솔루션이다
2. Component 는 필요한 종속 항목들의 목록과 제공 방법을 포함한 그래프이다
3. Dagger 구성핵심 - @Inject 주석은 Factory (Method Pattern) 생성을 대신 가능하게 해준다 
4. Dagger 구성핵심 - 종속 항목 범위 지정을 위해 @Scope 주석을 활용한다 
5. Dagger 구성핵심 - Components 구성을 위해 @Component 주석을 활용한다
```

<br/>

**Android 앱에서 Dagger 사용**

```
Q. 권장사항 으로 올바른 것은 ? 

1. @Inject 와 Setter Method 를 사용하여 Dagger 그래프에 유형을 추가합니다
2. @Provides 인터페이스에 어떤 구현이 있어야 하는지 Dagger 에 알립니다
3. @Binds 프로젝트가 소유하지 않은 클래스 제공 방법을 Dagger 에 알립니다
4. @ApplicationScope, @LoggedUserScope, @ActivityScope는 범위 주석으로 사용되는 기간을 제어할 수 있습니다
```

<br/>

**Dagger Module**

```
Q. 각 클래스의 인스턴스를 제공하는 방법(Dagger 모듈 내부의 정보)을 Dagger에 알리는 방법을 설명하세요.

- 일반 Class                             : 생성자 삽입, 
- Android Framework Classes             : 필드 삽입(종속항목) & Expose Inject Function, 
- Classes that your project doesn’t own : @Provides, 
- Interface                             : @Binds
```

<br/>

블로그 TODO
- 블로그 꾸미기 : 작성 규칙 고민하기
- CSS : Table Border 그리기
- hilt 정리하기
- 그래프 그려서 올려보기 (피그마 활용)