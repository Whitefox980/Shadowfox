# AI Template: Open Redirect Scanner

Open Redirect ranjivosti dozvoljavaju napadaču da preusmeri korisnika na zlonamerni URL koristeći legitimnu domenu.  
To može dovesti do phishing napada i krađe podataka.

Primeri ranjivih parametara: `?redirect=`, `?next=`, `?url=`, `?destination=`

Metod: šaljemo zahteve sa malicioznim URL-om (npr. `evil.com`) i proveravamo da li se redirekt desio bez validacije.
