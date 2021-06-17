-- Step 1 : remeber getMax to set identity seed 
select max(ref_id) from Work_Order_items_hist 
 
-- Step 2 : checking
-- expect can map 1 to 1  
select tb_now.Order_No as [NewID],tb_hist.Order_No as [OldID],tb_now.Order_Date,tb_now.Seat_No
from Work_Order tb_now
inner join Work_Order_hist tb_hist 
on tb_now.Order_Date =  tb_hist.Order_Date AND tb_now.seat_no = tb_hist.seat_no

-- if row count different, it means mapped more than 1, need to combine manully, try to delete duplicated row?

-- update old code with newly mapped identity 
update Work_Order_items 
  set Work_Order_items.order_no = tb_now.order_no
from 
Work_Order tb_now
inner join Work_Order_hist tb_hist on tb_now.Order_Date =  tb_hist.Order_Date 
inner join Work_Order_items modifying_Items on modifying_Items.Order_No = tb_hist.order_no
AND tb_now.seat_no = tb_hist.seat_no 
