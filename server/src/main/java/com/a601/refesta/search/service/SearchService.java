package com.a601.refesta.search.service;

import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.search.data.AutoCompleteRes;
import com.a601.refesta.search.data.SearchResultRes;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.a601.refesta.artist.domain.QArtist.artist;
import static com.a601.refesta.artist.domain.join.QArtistGenre.artistGenre;
import static com.a601.refesta.festival.domain.QFestival.festival;
import static com.a601.refesta.festival.domain.join.QFestivalGenre.festivalGenre;
import static com.a601.refesta.genre.domain.QGenre.genre;
import static com.a601.refesta.recommendation.domain.QMemberArtist.memberArtist;
import static com.a601.refesta.recommendation.domain.QMemberFestival.memberFestival;

@Slf4j
@Service
public class SearchService {

    private final JPAQueryFactory jpaQueryFactory;

    private final Map<Integer, List<String>> genreMap;
    private final List<String> consonantsList;
    private final Map<Integer, String> syllableMap;

    public SearchService(JPAQueryFactory jpaQueryFactory, Map<Integer, List<String>> genreMap,
                         List<String> consonantsList, Map<Integer, String> syllableMap) {
        this.jpaQueryFactory = jpaQueryFactory;
        this.genreMap = genreMap;
        this.consonantsList = consonantsList;
        this.syllableMap = syllableMap;
    }

    /**
     * 자동완성 검색어 반환
     *
     * @param memberId
     * @param inputWord
     * @return AutoCompleteRes - 페스티벌 검색어(최대 3개) 리스트, 아티스트 검색어(최대 3개) 리스트
     */
    public AutoCompleteRes getAutoComplete(int memberId, String inputWord) {
        //Todo: 검색 우선순위(완전 일치 >> 포함)
        List<String> festivalList;
        List<String> artistList;

        //검색어가 초성으로 끝나는 경우
        if(checkEndsWithConsonant(inputWord)) {
            String[] fromToWords = setFromToWord(inputWord);

            String fromWord = fromToWords[0];
            String toWord = fromToWords[1];

            //검색어 포함 페스티벌 이름 조회
            festivalList = jpaQueryFactory
                    .select(festival.name)
                    .from(memberFestival)
                    .innerJoin(festival).on(memberFestival.festival.id.eq(festival.id)
                            .and(memberFestival.member.id.eq(memberId)))
                    .where(festival.name.toLowerCase().between(fromWord.toLowerCase(), toWord.toLowerCase()))
                    .limit(3)
                    .fetch();

            //검색어 포함 아티스트 이름 조회
            artistList = jpaQueryFactory
                    .select(artist.name)
                    .from(memberArtist)
                    .innerJoin(artist).on(memberArtist.artist.id.eq(artist.id)
                            .and(memberArtist.member.id.eq(memberId)))
                    .where(artist.name.toLowerCase().between(fromWord.toLowerCase(), toWord.toLowerCase()))
                    .limit(3)
                    .fetch();
        } else {
            //검색어 포함 페스티벌 이름 조회
            festivalList = jpaQueryFactory
                    .select(festival.name)
                    .from(memberFestival)
                    .innerJoin(festival).on(memberFestival.festival.id.eq(festival.id)
                            .and(memberFestival.member.id.eq(memberId)))
                    .where(festival.name.toLowerCase().contains(inputWord.toLowerCase()))
                    .limit(3)
                    .fetch();

            //검색어 포함 아티스트 이름 조회
            artistList = jpaQueryFactory
                    .select(artist.name)
                    .from(memberArtist)
                    .innerJoin(artist).on(memberArtist.artist.id.eq(artist.id)
                            .and(memberArtist.member.id.eq(memberId)))
                    .where(artist.name.toLowerCase().contains(inputWord.toLowerCase()))
                    .limit(3)
                    .fetch();
        }

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
        //Todo: 검색 우선순위(완전 일치 >> 포함)
        List<SearchResultRes.FestivalResult> festivalResultList;
        List<SearchResultRes.ArtistResult> artistResultList;

        if(checkEndsWithConsonant(searchWord)) {
            String[] fromToWords = setFromToWord(searchWord);

            String fromWord = fromToWords[0];
            String toWord = fromToWords[1];

            //검색어 포함 페스티벌 조회(이름)
            festivalResultList = jpaQueryFactory
                    .select(Projections.constructor(SearchResultRes.FestivalResult.class,
                            festival.id, festival.name, festival.posterUrl, festival.isEnded))
                    .from(memberFestival)
                    .innerJoin(festival).on(memberFestival.festival.id.eq(festival.id)
                            .and(memberFestival.member.id.eq(memberId)))
                    .where(festival.name.toLowerCase().between(fromWord.toLowerCase(), toWord.toLowerCase()))
                    .fetch();

            //검색어 포함 아티스트 조회(이름)
            artistResultList = jpaQueryFactory
                    .select(Projections.constructor(SearchResultRes.ArtistResult.class,
                            artist.id, artist.name, artist.pictureUrl))
                    .from(memberArtist)
                    .innerJoin(artist).on(memberArtist.artist.id.eq(artist.id)
                            .and(memberArtist.member.id.eq(memberId)))
                    .where(artist.name.toLowerCase().between(fromWord.toLowerCase(), toWord.toLowerCase()))
                    .fetch();
        } else {
            //검색어 포함 페스티벌 조회(이름)
            festivalResultList = jpaQueryFactory
                    .select(Projections.constructor(SearchResultRes.FestivalResult.class,
                            festival.id, festival.name, festival.posterUrl, festival.isEnded))
                    .from(memberFestival)
                    .innerJoin(festival).on(memberFestival.festival.id.eq(festival.id)
                            .and(memberFestival.member.id.eq(memberId)))
                    .where(festival.name.toLowerCase().contains(searchWord.toLowerCase()))
                    .fetch();

            //검색어 포함 아티스트 조회(이름)
            artistResultList = jpaQueryFactory
                    .select(Projections.constructor(SearchResultRes.ArtistResult.class,
                            artist.id, artist.name, artist.pictureUrl))
                    .from(memberArtist)
                    .innerJoin(artist).on(memberArtist.artist.id.eq(artist.id)
                            .and(memberArtist.member.id.eq(memberId)))
                    .where(artist.name.toLowerCase().contains(searchWord.toLowerCase()))
                    .fetch();

            for(int genreIdx = 1; genreIdx < genreMap.size(); genreIdx++) {
                if(genreMap.get(genreIdx).contains(searchWord.toLowerCase())) {
                    //페스티벌 조회(장르)
                    List<SearchResultRes.FestivalResult> festivalGenreResult = jpaQueryFactory
                            .select(Projections.constructor(SearchResultRes.FestivalResult.class,
                                    festival.id, festival.name, festival.posterUrl, festival.isEnded))
                            .from(memberFestival)
                            .innerJoin(festival).on(memberFestival.festival.id.eq(festival.id)
                                    .and(memberFestival.member.id.eq(memberId)))
                            .innerJoin(festivalGenre).on(festivalGenre.genre.id.eq(genreIdx)
                                    .and(festivalGenre.festival.id.eq(festival.id)))
                            .fetch();

                    festivalResultList.addAll(festivalGenreResult);

                    //아티스트 조회(장르)
                    List<SearchResultRes.ArtistResult> artistGenreResult = jpaQueryFactory
                            .select(Projections.constructor(SearchResultRes.ArtistResult.class,
                                    artist.id, artist.name, artist.pictureUrl))
                            .from(memberArtist)
                            .innerJoin(artist).on(memberArtist.artist.id.eq(artist.id)
                                    .and(memberArtist.member.id.eq(memberId)))
                            .innerJoin(artistGenre).on(artistGenre.genre.id.eq(genreIdx)
                                    .and(artistGenre.artist.id.eq(artist.id)))
                            .limit(10)
                            .fetch();

                    artistResultList.addAll(artistGenreResult);

                    break;
                }
            }
        }

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

    /**
     * 입력어 한글 초성으로 끝나는지 확인
     *
     * @param word
     * @return true/false
     */
    public boolean checkEndsWithConsonant (String word) {
        if(word == null || word.equals("")) {
            throw new CustomException(ErrorCode.SEARCH_WORD_NULL_ERROR);
        }

        Pattern consonants = Pattern.compile("[ㄱ-ㅎ]");
        String endLetter = word.substring(word.length() - 1);
        Matcher matcher = consonants.matcher(endLetter);

        return matcher.find();
    }

    /**
     * 초성 검색 시작, 끝 지정
     * @param word
     * @return String[] - fromWord, toWord
     */
    public String[] setFromToWord(String word) {
        String[] wordArr = new String[2];

        int syllableKey = 0;
        String consonant = word.substring(word.length() - 1);
        for (int consonantIdx = 0; consonantIdx < consonantsList.size(); consonantIdx++) {
            if (consonant.equals(consonantsList.get(consonantIdx))) {
                syllableKey = consonantIdx;
            }
        }

        //ex) ㄱ 입력 시 가 ~ 깋, ㄴ 입력 시 나 ~ 닣
        wordArr[0] = consonant + syllableMap.get(syllableKey);
        wordArr[1] = consonant + syllableMap.get(syllableKey + 1);

        return wordArr;
    }
}
