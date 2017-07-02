robocopy ../export ../../bin/assets /e
cd ../../bin/assets/hd/shop/
copy "library.json" "../../shop.json"
cd ../hud/
copy "library.json" "../../hud.json"
cd ../popin/
copy "library.json" "../../popin.json"
cd ../hudparade/
copy "library.json" "../../hudparade.json"
