package com.a601.refesta.search.service;

import com.a601.refesta.recommendation.repository.MemberArtistRepository;
import com.a601.refesta.recommendation.repository.MemberFestivalRepository;
import com.a601.refesta.search.data.AutoCompleteRes;
import com.a601.refesta.search.data.SearchResultRes;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static com.a601.refesta.artist.domain.QArtist.artist;
import static com.a601.refesta.artist.domain.join.QArtistGenre.artistGenre;
import static com.a601.refesta.festival.domain.QFestival.festival;
import static com.a601.refesta.genre.domain.QGenre.genre;
import static com.a601.refesta.recommendation.domain.QMemberArtist.memberArtist;
import static com.a601.refesta.recommendation.domain.QMemberFestival.memberFestival;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchService {

    private final JPAQueryFactory jpaQueryFactory;

    /**
     * 자동완성 검색어 반환
     *
     * @param memberId
     * @param inputWord
     * @return AutoCompleteRes - 페스티벌 검색어(최대 3개) 리스트, 아티스트 검색어(최대 3개) 리스트
     */
    public AutoCompleteRes getAutoComplete(int memberId, String inputWord) {
        //검색어 포함 페스티벌 이름 조회
        List<String> festivalList = jpaQueryFactory
                .select(festival.name)
                .from(memberFestival)
                .innerJoin(festival).on(memberFestival.festival.id.eq(festival.id)
                        .and(memberFestival.member.id.eq(memberId)))
                .where(festival.name.contains(inputWord))
                .limit(3)
                .fetch();

        //검색어 포함 아티스트 이름 조회
        List<String> artistList = jpaQueryFactory
                .select(artist.name)
                .from(memberArtist)
                .innerJoin(artist).on(memberArtist.artist.id.eq(artist.id)
                        .and(memberArtist.member.id.eq(memberId)))
                .where(artist.name.contains(inputWord))
                .limit(3)
                .fetch();

        //조회 정보 반환
        return AutoCompleteRes.builder()
                .festivalWordList(festivalList)
                .artistWordList(artistList)
                .build();
    }

    /**
     * 검색 결과 반환
     *
     * @param memberId
     * @param searchWord
     * @return SearchResultRes - 페스티벌 리스트(아이디, 이름, 포스터 Url), 아티스트 리스트(아이디, 이름, 사진 Url, 장르 리스트)
     */
    public SearchResultRes getSearchResult(int memberId, String searchWord) {
        //페스티벌 조회
        List<SearchResultRes.FestivalResult> festivalResultList = jpaQueryFactory
                .select(Projections.constructor(SearchResultRes.FestivalResult.class,
                        festival.id, festival.name, festival.posterUrl, festival.isEnded))
                .from(memberFestival)
                .innerJoin(festival).on(memberFestival.festival.id.eq(festival.id)
                        .and(memberFestival.member.id.eq(memberId)))
                .where(festival.name.contains(searchWord))
                .fetch();

        //아티스트 조회
        List<SearchResultRes.ArtistResult> artistResultList = jpaQueryFactory
                .select(Projections.constructor(SearchResultRes.ArtistResult.class,
                        artist.id, artist.name, artist.pictureUrl))
                .from(memberArtist)
                .innerJoin(artist).on(memberArtist.artist.id.eq(artist.id)
                        .and(memberArtist.member.id.eq(memberId)))
                .where(artist.name.contains(searchWord))
                .fetch();

        for(SearchResultRes.ArtistResult artistResult : artistResultList) {
            //아티스트 장르 조회
            List<String> genreList = jpaQueryFactory
                    .select(genre.name)
                    .from(artistGenre)
                    .innerJoin(genre).on(genre.id.eq(artistGenre.genre.id)
                            .and(artistGenre.artist.id.eq(artistResult.getId())))
                    .fetch();

            artistResult.setGenre(genreList);
        }

        //조회 정보 반환
        return new SearchResultRes(festivalResultList, artistResultList);
    }
}
