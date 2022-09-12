package org.example.cardgame.application.handle;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;

import org.example.cardgame.application.handle.model.JuegoListViewModel;
import org.example.cardgame.application.handle.model.MazoViewModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Configuration
public class QueryHandle {

  private final ReactiveMongoTemplate template;

  public QueryHandle(ReactiveMongoTemplate template) {
    this.template = template;
  }

  @Bean
  public RouterFunction<ServerResponse> listarJuego() {
    return RouterFunctions.route(
        GET("/juego/listar/{id}"),
        request -> template.find(filterByUId(request.pathVariable("id")), JuegoListViewModel.class,
                "gameview")
            .collectList()
            .flatMap(list -> ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(
                    BodyInserters.fromPublisher(Flux.fromIterable(list), JuegoListViewModel.class)))
    );
  }


  @Bean
  public RouterFunction<ServerResponse> mazoPorJugador() {
    return RouterFunctions.route(
        GET("/mazo/{jugadorId}/{juegoId}"),
        request -> template.findOne(filterByJugadorId(request.pathVariable("jugadorId"),
                    request.pathVariable("juegoId")), MazoViewModel.class,
                "mazoview")
            .flatMap(list -> ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromPublisher(Mono.just(list), MazoViewModel.class)))
    );
  }

  @Bean
  public RouterFunction<ServerResponse> getGames() {
    return RouterFunctions.route(
        GET("/juegos/"),
        serverRequest -> template.findAll(JuegoListViewModel.class, "gameview")
            .collectList()
            .flatMap(games -> ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromPublisher(Flux.fromIterable(games),
                    JuegoListViewModel.class))));

  }

  private Query filterByUId(String uid) {
    return new Query(
        Criteria.where("uid").is(uid)
    );
  }

  private Query filterByJugadorId(String jugadorId, String juegoId) {
    return new Query(
        Criteria.where("jugadorId").is(jugadorId).and("juegoId").is(juegoId)
    );
  }


}