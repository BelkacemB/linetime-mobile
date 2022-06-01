# LineTime
Use spaced repetition to develop healthy atomic habits.
## Database structure
    habits { 
        user1Id {
            habit1Id { 
                habitName: 'foo',
                benefit: 3, 
                ...
            }
            habit2Id {
                habitName: 'bar',
                benefit: 2, 
                ...
            }
        }
        user2Id { 
            habit3Id {
                ...
            }
        }
    }