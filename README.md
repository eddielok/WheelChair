# WheelChair
WheelChairSmallSnow

below, the direct URLs 

###########################
##      Login page     ####
###########################

http://localhost:56650/login
- member01/Today@0108  
- admin/1234 (devloper local)
- admin/Today@0108 (UAT)


####################################### 
##      Maintenance Logs Page     ####
#######################################

http://localhost:56650/MaintenanceLogsPage?pageAction=update&workingForm=maintenance_log&id=6

http://localhost:56650/MaintenanceLogsPage?pageAction=create&workingForm=maintenance_log

http://localhost:56650/MaintenanceLogsPage/Search

####################################### 
##        work orders Page         ####
#######################################

http://localhost:56650/WorkOrderPage/edit?id=43&pageAction=update

http://localhost:56650/WorkOrderPage/Edit?seatNo=SEAT2010566&pageAction=create

http://localhost:56650/WorkOrderPage/Index?seatno=SEAT0410218

####################################### 
##           PPMI Page             ####
#######################################

http://localhost:56650/PPMIPage/Index?seatno=SEAT0410218

http://localhost:56650/PPMIPage/Edit?seatNo=SEAT0410218&pageAction=create

###########################
##      search       ####
###########################
###### search input boxes page 
http://localhost:56650/Accessment

###########################
##    assessment     ####
###########################

###### view all assessment records relate to this seatNo 
http://localhost:56650/Accessment/AllAspect?seatno=SEAT0010072

###### update Medical_Information 
http://localhost:56650/Accessment?Id=123&pageAction=update&seatno=756&workingForm=Medical_Information  

###### update Problem_Objective_List   
http://localhost:56650/Accessment?Id=343&pageAction=update&seatno=test_seat00&workingForm=Problem_Objective_List  
 
###### create and direct to Medical_Information   
http://localhost:56650/Accessment?pageAction=create&seatno=test_seat00&workingForm=Medical_Information
 
##############################
##  client information  ####
##############################
###### create a new client information
http://localhost:56650/ClientSearch/clientInformation?pageAction=create

###### create an existing client information
http://localhost:56650/ClientSearch/clientInformation?pageAction=update&seatNo=SEAT0010003  

####################################
##    WheelChair information  ####
####################################
###### create a new WheelChair_Information
http://localhost:56650/WheelChairInformationPage?pageAction=create&workingForm=WheelChair_Information

###### update WheelChair_Information   
http://localhost:56650/WheelChairInformationPage?pageAction=update&seatno=WC222&workingForm=WheelChair_Information

###### search page WheelChair_Information
http://localhost:56650/WheelChairInformationPage/Search

##############################
##  parts information   ####
##############################
http://localhost:56650/PartsInformationsPage?pageAction=create&workingForm=Part_Information
http://localhost:56650/PartsInformationsPage?pageAction=update&workingForm=Part_Information&id=312


####################################
##     Supplier information   ####
####################################

http://localhost:56650/SupplierInformation?pageAction=create&workingForm=Supplier_Information
http://localhost:56650/SupplierInformation?pageAction=update&workingForm=Supplier_Information&id=17
http://localhost:56650/SupplierInformation/Search

####################################
##     Loan information   ####
####################################
http://localhost:56650/LoanInformationPage?pageAction=create&workingForm=loan_record
http://localhost:56650/LoanInformationPage?pageAction=update&workingForm=loan_record&id=CP787
http://localhost:56650/LoanInformationPage/Search
 
####################################
##     Wheel chair Specifications Page   ####
####################################
http://localhost:56650/WheelchairSpecificationsPage?pageAction=create&workingForm=WheelChair_Specification
http://localhost:56650/WheelchairSpecificationsPage?pageAction=update&workingForm=WheelChair_Specification&id=68
