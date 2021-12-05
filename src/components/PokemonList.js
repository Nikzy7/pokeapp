import React from 'react'

export const PokemonList = ({ pokemon }) => {
    return (
        <div>
            {pokemon.map(p => (
                <div key={p}>{p}</div>
            ))}
        </div>
    )
}
