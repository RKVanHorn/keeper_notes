package keeper.notes.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import keeper.notes.entity.Keeper;


/*Extending JpaRepository with this interface gives a set of standard CRUD operations already built in*/
public interface KeeperDao extends JpaRepository<Keeper, Long> {

}
