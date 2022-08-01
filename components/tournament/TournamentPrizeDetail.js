const TournamentPrizeDetail = ({ tournament }) => {
  return (
    <>
      <div className="new_result">
        <div className="top_three_prize">
          {tournament &&
            tournament.prizes.slice(0, 3).map((tourPrize) => (
              <div className="prize_box">
                <div className="first_symb">
                  {tourPrize.place.length > 0 ? (
                    <>{tourPrize?.place}</>
                  ) : (
                    'No place Assigned'
                  )}
                </div>
                <div className="prize_money">
                  {tourPrize.trophy_img.length > 0 ? (
                    <img src={tourPrize?.trophy_img} alt={tourPrize?.place} />
                  ) : (
                    'No Image'
                  )}
                  <div className="money">
                    {tourPrize.goodies.length > 0 ? (
                      <>{tourPrize?.goodies}</>
                    ) : (
                      'No Prize Yet'
                    )}
                    <span>+</span>
                    {tourPrize.prizeName.length > 0 ? (
                      <>
                        <p>{tourPrize?.prizeName}</p>
                      </>
                    ) : (
                      'No Trophy Yet'
                    )}
                  </div>
                </div>
                <div className="prize_foot">
                  {tourPrize.prize_sponsor.name.length > 0 ? (
                    <>
                      Prizes sponsered by{' '}
                      <img
                        src={tourPrize?.prize_sponsor?.imgUrl}
                        alt={tourPrize?.prize_sponsor?.name}
                      />
                    </>
                  ) : (
                    'No Sponsors Yet'
                  )}
                </div>
              </div>
            ))}
        </div>

        <div className="more_prizes">
          {tournament &&
            tournament.prizes.slice(3).map((tourPrize) => (
              <div className="prize_box">
                <div className="first_symb">
                  {tourPrize.place.length > 0 ? (
                    <>{tourPrize?.place}</>
                  ) : (
                    'No place Assigned'
                  )}
                </div>
                <div className="prize_money">
                  <div className="money">
                    {tourPrize.goodies.length > 0 ? (
                      <>{tourPrize?.goodies}</>
                    ) : (
                      'No Prize Yet'
                    )}
                    <span>+</span>
                    {tourPrize.prizeName.length > 0 ? (
                      <>
                        <p>{tourPrize?.prizeName}</p>
                      </>
                    ) : (
                      'No Trophy Yet'
                    )}
                  </div>
                </div>
                <div className="prize_foot">
                  {tourPrize.prize_sponsor.name.length > 0 ? (
                    <>
                      Prizes sponsered by{' '}
                      <img
                        src={tourPrize?.prize_sponsor?.imgUrl}
                        alt={tourPrize?.prize_sponsor?.name}
                      />
                    </>
                  ) : (
                    'No Sponsors Yet'
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TournamentPrizeDetail;
