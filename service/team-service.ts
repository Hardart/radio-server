const team = [
  {
    name: 'Ella Ward',
    position: 'Dental Assistant',
    image: '/images/team/01.webp',
  },

  {
    name: 'Cedric Wilson',
    position: 'Dental Assistant',
    image: '/images/team/02.webp',
  },

  {
    name: 'Sandra Kim',
    position: 'Dental Assistant',
    image: '/images/team/03.webp',
  },

  {
    name: 'Edie Sheffield',
    position: 'Dental Assistant',
    image: '/images/team/04.webp',
  },

  {
    name: 'Miriam Weber',
    position: 'Office Management',
    image: '/images/team/05.webp',
  },

  {
    name: 'Amber Rosso',
    position: 'Office Management',
    image: '/images/team/06.webp',
  },

  {
    name: 'Alison Hart',
    position: 'Front Desk',
    image: '/images/team/07.webp',
  },

  {
    name: 'Shelley Wyatt',
    position: 'Front Desk',
    image: '/images/team/08.webp',
  },
]

class TeamService {
  async all() {
    return team
  }
}

export default new TeamService()
