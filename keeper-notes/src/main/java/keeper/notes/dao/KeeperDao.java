package keeper.notes.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import keeper.notes.entity.Keeper;

public interface KeeperDao extends JpaRepository<Keeper, Long> {

}
