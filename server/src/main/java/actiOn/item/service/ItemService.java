package actiOn.item.service;

import actiOn.exception.BusinessLogicException;
import actiOn.exception.ExceptionCode;
import actiOn.item.entity.Item;
import actiOn.item.repository.ItemRepository;
import actiOn.store.entity.Store;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;

    // 기존 아이템을 수정 후 저장
    public List<Item> updateItems(List<Item> findItems, List<Item> newItems) {
        Store parentStore = findItems.get(0).getStore();
        itemStatusChange(findItems);
        List<Item> items = new ArrayList<>();
        for (Item item : newItems) {
            Item newItem = new Item();
            newItem.setItemName(item.getItemName());
            newItem.setPrice(item.getPrice());
            newItem.setTotalTicket(item.getTotalTicket());
            newItem.setStore(parentStore);
            items.add(newItem);
        }
        return itemRepository.saveAll(items);

    }
    private void itemStatusChange(List<Item> findItems) {
        for (Item item : findItems) {
            item.setStatus("deleted");
        }
    }

    public Item findItem(Item item) {
        Optional<Item> findItem = itemRepository.findItemByItemId(item.getItemId());

        if (findItem.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND);
        }

        return findItem.get();
    }
}
