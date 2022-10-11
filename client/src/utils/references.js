module.exports = {
//get icons
    getIcon: prop => {
        let icons = {
            home: 'mdi-home',
            region: 'mdi-fish'
        }
        return icons[prop] || '';
    }
}