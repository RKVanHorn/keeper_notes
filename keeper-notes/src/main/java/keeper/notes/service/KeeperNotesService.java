package keeper.notes.service;

import java.util.NoSuchElementException;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import keeper.notes.controller.model.KeeperData;
import keeper.notes.dao.AnimalDao;
import keeper.notes.dao.KeeperDao;
import keeper.notes.dao.NoteDao;
import keeper.notes.entity.Keeper;

@Service
public class KeeperNotesService {

	@Autowired
	private KeeperDao keeperDao;

	@Autowired
	private AnimalDao animalDao;

	@Autowired
	private NoteDao noteDao;

	public KeeperData saveKeeper(KeeperData keeperData) {
		Keeper keeper = findOrCreateKeeper(keeperData.getKeeperId());
		copyKeeperData(keeper, keeperData);

		Keeper dbKeeper = keeperDao.save(keeper);
		return new KeeperData(dbKeeper);
	}

	private void copyKeeperData(Keeper keeper, KeeperData keeperData) {
		keeper.setKeeperId(keeperData.getKeeperId());
		keeper.setFirstName(keeperData.getFirstName());
		keeper.setLastName(keeperData.getLastName());
		keeper.setRadioNumber(keeperData.getRadioNumber());

	}

	private Keeper findOrCreateKeeper(Long keeperId) {
		Keeper keeper;

		if (Objects.isNull(keeperId)) {
			keeper = new Keeper();
		} else {
			keeper = findKeeperById(keeperId);
		}

		return keeper;
	}

	private Keeper findKeeperById(Long keeperId) {
		return keeperDao.findById(keeperId)
				.orElseThrow(() -> new NoSuchElementException("Keeper with ID=" + keeperId + " does not exist."));
	}
}
