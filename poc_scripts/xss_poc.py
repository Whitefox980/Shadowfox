# pri vrhu
from logics.log_utils import log_to_sheet

# kad nađe ranjivost
log_to_sheet("xss_poc.py", "Reflektovani XSS pronađen!")

# kad ne nađe
log_to_sheet("xss_poc.py", "Nema refleksije")
