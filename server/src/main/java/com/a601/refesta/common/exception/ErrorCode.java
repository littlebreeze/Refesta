package com.a601.refesta.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    //Member
    MEMBER_NOT_FOUND_ERROR(404, "MEM001", "존재하지 않는 사용자입니다."),

    //Token
    ACCESS_TOKEN_EXPIRE_ERROR(401, "TOK001", "ACCESS TOKEN이 만료되었습니다."),
    ACCESS_TOKEN_ERROR(401, "TOK002", "Access Token이 잘못되었습니다."),
    REFRESH_TOKEN_VALIDATION_ERROR(401, "TOK003", "Refresh Token이 잘못되었습니다."),

    //Recommendation(member)
    RECOMMENDATION_NOT_READY_ERROR(503, "RCM001", "사용자의 추천 정보를 제공할 수 없습니다."),
    ARTIST_RECOMMENDATION_ENDED_ERROR(503, "RCM002", "준비된 아티스트 추천 리스트를 이미 모두 조회했습니다."),

    //Festival
    FESTIVAL_NOT_FOUND_ERROR(404, "FES001", "존재하지 않는 페스티벌입니다."),
    FESTIVAL_DETAIL_NOT_READY_ERROR(503, "FES002", "예정된 페스티벌의 상세 정보가 등록되지 않았습니다."),
    FESTIVAL_ALREADY_ENDED_ERROR(400, "FES003", "이미 종료된 페스티벌입니다."),
    FESTIVAL_IS_NOT_ENDED_ERROR(400, "FES004", "아직 종료되지 않은 페스티벌입니다."),
    FESTIVAL_SETLIST_NOT_READY_ERROR(503, "FES005", "페스티벌 셋리스트 정보를 제공할 수 없습니다."),
    FESTIVAL_LINEUP_NOT_READY_ERROR(503, "FES006", "페스티벌 라인업 정보를 제공할 수 없습니다."),

    //Artist
    ARTIST_NOT_FOUND_ERROR(404, "ART001", "존재하지 않는 아티스트입니다.");

    private final int status;

    private final String code;

    private final String message;
}
