package org.example.cardgame.application.handle.materialize;

import co.com.sofka.domain.generic.DomainEvent;
import co.com.sofka.domain.generic.Identity;
import java.time.Instant;
import java.util.stream.Collectors;
import org.bson.Document;
import org.example.cardgame.events.RondaCreada;
import org.example.cardgame.events.TableroCreado;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

@Configuration
public class BoardMaterializeHandle {

  private static final String COLLECTION_VIEW = "tableroview";

  private final ReactiveMongoTemplate template;

  public BoardMaterializeHandle(ReactiveMongoTemplate template) {
    this.template = template;
  }

  @EventListener
  public void handleBoardCreated(TableroCreado event) {
    var data = new Document();
    var update = new Update();
    var jugadores = event.getJugadorIds().stream()
        .map(Identity::value)
        .collect(Collectors.toList());
    data.put("juedoId", event.aggregateRootId());
    data.put("fecha", Instant.now());
    data.put("tablero.id", event.getTableroId().value());
    data.put("tablero.jugadores", jugadores);
    data.put("tablero.habilitado", false);
    data.put("iniciado", true);
    template.updateFirst(getFilterByAggregateId(event), update, COLLECTION_VIEW)
        .block();
    template.save(data, COLLECTION_VIEW).block();
  }


  @EventListener
  public void handleTableroCreado(TableroCreado event) {
    var data = new Update();
    var jugadores = event.getJugadorIds().stream()
        .map(Identity::value)
        .collect(Collectors.toList());

    data.set("fecha", Instant.now());
    data.set("tablero.id", event.getTableroId().value());
    data.set("tablero.jugadores", jugadores);
    data.set("tablero.habilitado", false);
    data.set("iniciado", true);
    template.updateFirst(getFilterByAggregateId(event), data, COLLECTION_VIEW)
        .block();
  }


  @EventListener
  public void handleRondaCreada(RondaCreada event) {
    var data = new Update();
    var ronda = event.getRonda().value();
    var document = new Document();
    var jugadores = ronda.jugadores().stream()
        .map(Identity::value)
        .collect(Collectors.toList());

    document.put("jugadores", jugadores);
    document.put("numero", ronda.numero());
    document.put("iniciada",false);

    data.set("fecha", Instant.now());
    data.set("tiempo", event.getTiempo());
    data.set("ronda", document);
    template.updateFirst(getFilterByAggregateId(event), data, COLLECTION_VIEW).block();
  }

  private Query getFilterByAggregateId(DomainEvent event) {
    return new Query(
        Criteria.where("_id").is(event.aggregateRootId())
    );
  }
}
